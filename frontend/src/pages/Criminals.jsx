import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import { getCriminals, createCriminal } from '../api/criminalApi';

const emptyForm = {
  name: '',
  age: '',
  gender: 'male',
  riskLevel: 'low',
  isWanted: false,
};

const riskColors = {
  low: 'bg-success/15 text-success',
  medium: 'bg-warning/15 text-warning',
  high: 'bg-danger/15 text-danger',
};

const Criminals = () => {
  const [criminals, setCriminals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  const fetchCriminals = async () => {
    setLoading(true);
    const res = await getCriminals();
    setCriminals(res.data.data.criminals);
    setLoading(false);
  };

  useEffect(() => {
    fetchCriminals();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createCriminal(form);
    setModalOpen(false);
    setForm(emptyForm);
    fetchCriminals();
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    {
      key: 'riskLevel',
      label: 'Risk',
      render: (row) => (
        <span className={`text-xs px-2 py-1 rounded-full ${riskColors[row.riskLevel]}`}>
          {row.riskLevel}
        </span>
      ),
    },
    {
      key: 'isWanted',
      label: 'Wanted',
      render: (row) =>
        row.isWanted ? (
          <span className="text-xs px-2 py-1 rounded-full bg-danger/15 text-danger">Wanted</span>
        ) : (
          <span className="text-xs text-textDark/40">—</span>
        ),
    },
    {
      key: 'action',
      label: '',
      render: (row) => (
        <button
          onClick={() => navigate(`/criminals/${row._id}`)}
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
        <h2 className="text-xl font-heading font-semibold">Criminal Records</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-button-gradient text-white text-sm"
        >
          <Plus size={16} /> New Record
        </button>
      </div>

      {loading ? <Loader size="lg" /> : <DataTable columns={columns} data={criminals} />}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Criminal Record">
        <form onSubmit={handleCreate} className="space-y-3 text-sm">
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg px-3 py-2"
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-3 py-2"
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-3 py-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select
            name="riskLevel"
            value={form.riskLevel}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-3 py-2"
          >
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isWanted"
              checked={form.isWanted}
              onChange={handleChange}
            />
            Mark as Wanted
          </label>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-button-gradient text-white font-medium"
          >
            Save Record
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Criminals;