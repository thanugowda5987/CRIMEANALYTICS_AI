import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DataTable from '../components/common/DataTable';
import Loader from '../components/common/Loader';
import axiosInstance from '../api/axiosInstance';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axiosInstance.get('/audit');
      setLogs(res.data.data.logs);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  const columns = [
    { key: 'action', label: 'Action' },
    { key: 'module', label: 'Module' },
    {
      key: 'user',
      label: 'User',
      render: (row) => row.user?.name || '—',
    },
    { key: 'details', label: 'Details' },
    {
      key: 'createdAt',
      label: 'Timestamp',
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-xl font-heading font-semibold mb-5">Audit Logs</h2>
      {loading ? <Loader size="lg" /> : <DataTable columns={columns} data={logs} />}
    </DashboardLayout>
  );
};

export default AuditLogs;