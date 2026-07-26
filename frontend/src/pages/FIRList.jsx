import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import { getFIRs, createFIR } from '../api/firApi';
import { exportFIRReport } from '../api/reportApi';

const emptyForm = {
  firNumber: '',
  district: '',
  policeStation: '',
  complainantName: '',
  incidentDate: '',
  incidentLocation: '',
  crimeType: '',
  description: '',
};

const statusColors = {
  open: 'bg-warning/15 text-warning',
  under_investigation: 'bg-secondary/15 text-secondary',
  closed: 'bg-textDark/10 text-textDark/60',
  solved: 'bg-success/15 text-success',
};

const FIRList = () => {
  const [firs, setFirs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  const fetchFIRs = async () => {
    setLoading(true);
    const res = await getFIRs();
    setFirs(res.data.data.firs);
    setLoading(false);
  };

  useEffect(() => {
    fetchFIRs();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    await createFIR(form);
    setModalOpen(false);
    setForm(emptyForm);
    fetchFIRs();
  };

  const handleExport = async () => {
    const res = await exportFIRReport();
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fir-report.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const columns = [
    { key: 'firNumber', label: 'FIR No.' },
    { key: 'district', label: 'District' },
    { key: 'crimeType', label: 'Crime Type' },
    { key: 'complainantName', label: 'Complainant' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[row.status]}`}>
          {row.status.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'action',
      label: '',
      render: (row) => (
        <button
          onClick={() => navigate(`/firs/${row._id}`)}
          className="text-primary text-xs font-medium hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-heading font-semibold">FIR Search</h2>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-border text-sm hover:bg-black/5"
          >
            <Download size={16} /> Export PDF
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-button-gradient text-white text-sm"
          >
            <Plus size={16} /> New FIR
          </button>
        </div>
      </div>

      {loading ? <Loader size="lg" /> : <DataTable columns={columns} data={firs} />}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register New FIR">
        <form onSubmit={handleCreate} className="space-y-3 text-sm">
          {Object.keys(emptyForm).map((field) => (
            <input
              key={field}
              name={field}
              type={field === 'incidentDate' ? 'date' : 'text'}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          ))}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-button-gradient text-white font-medium"
          >
            Submit FIR
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default FIRList;