import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import { getCases, createCase } from '../api/caseApi';
import { exportCaseReport } from '../api/reportApi';

const emptyForm = {
  caseNumber: '',
  title: '',
  district: '',
  crimeType: '',
  priority: 'medium',
};

const priorityColors = {
  low: 'bg-success/15 text-success',
  medium: 'bg-secondary/15 text-secondary',
  high: 'bg-warning/15 text-warning',
  critical: 'bg-danger/15 text-danger',
};

const statusColors = {
  open: 'bg-warning/15 text-warning',
  under_investigation: 'bg-secondary/15 text-secondary',
  closed: 'bg-textDark/10 text-textDark/60',
  solved: 'bg-success/15 text-success',
};

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  const fetchCases = async () => {
    setLoading(true);
    const res = await getCases();
    setCases(res.data.data.cases);
    setLoading(false);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    await createCase(form);
    setModalOpen(false);
    setForm(emptyForm);
    fetchCases();
  };

  const handleExport = async () => {
    const res = await exportCaseReport();
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'case-report.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const columns = [
    { key: 'caseNumber', label: 'Case No.' },
    { key: 'title', label: 'Title' },
    { key: 'district', label: 'District' },
    { key: 'crimeType', label: 'Crime Type' },
    {
      key: 'priority',
      label: 'Priority',
      render: (row) => (
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[row.priority]}`}>
          {row.priority}
        </span>
      ),
    },
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
          onClick={() => navigate(`/cases/${row._id}`)}
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
        <h2 className="text-xl font-heading font-semibold">Cases</h2>
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
            <Plus size={16} /> New Case
          </button>
        </div>
      </div>

      {loading ? <Loader size="lg" /> : <DataTable columns={columns} data={cases} />}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Open New Case">
        <form onSubmit={handleCreate} className="space-y-3 text-sm">
          {Object.keys(emptyForm)
            .filter((f) => f !== 'priority')
            .map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full border border-border rounded-lg px-3 py-2"
              />
            ))}
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-button-gradient text-white font-medium"
          >
            Create Case
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Cases;