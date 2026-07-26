import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { getCriminalById, getCriminalNetwork } from '../api/criminalApi';

const CriminalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [criminal, setCriminal] = useState(null);
  const [network, setNetwork] = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [c, n] = await Promise.all([getCriminalById(id), getCriminalNetwork(id)]);
      setCriminal(c.data.data.criminal);
      setNetwork(n.data.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader size="lg" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-textDark/60 mb-4 hover:text-primary"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-heading font-semibold mb-3">{criminal.name}</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-textDark/50">Age:</span> {criminal.age || '—'}</p>
            <p><span className="text-textDark/50">Gender:</span> {criminal.gender || '—'}</p>
            <p><span className="text-textDark/50">Risk Level:</span> {criminal.riskLevel}</p>
            <p><span className="text-textDark/50">Wanted:</span> {criminal.isWanted ? 'Yes' : 'No'}</p>
            <p>
              <span className="text-textDark/50">Crime Categories:</span>{' '}
              {criminal.crimeCategories?.join(', ') || '—'}
            </p>
            <p>
              <span className="text-textDark/50">Known Addresses:</span>{' '}
              {criminal.knownAddresses?.join('; ') || '—'}
            </p>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h4 className="font-heading font-semibold text-sm mb-3">Associate Network</h4>
          {network.nodes.length <= 1 ? (
            <p className="text-sm text-textDark/50">No known associates recorded.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {network.edges.map((e, i) => (
                <li key={i} className="flex justify-between border-b border-border/60 pb-2">
                  <span>
                    {network.nodes.find((n) => n.id === e.from)?.label} →{' '}
                    {network.nodes.find((n) => n.id === e.to)?.label}
                  </span>
                  <span className="text-textDark/50">{e.relation}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CriminalDetail;