import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { getFIRById, updateFIR } from '../api/firApi';

const FIRDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fir, setFir] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFIR = async () => {
      const res = await getFIRById(id);
      setFir(res.data.data.fir);
      setLoading(false);
    };
    fetchFIR();
  }, [id]);

  const handleStatusChange = async (status) => {
    const res = await updateFIR(id, { status });
    setFir(res.data.data.fir);
  };

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

      <Card className="max-w-2xl">
        <h2 className="text-lg font-heading font-semibold mb-4">FIR {fir.firNumber}</h2>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-textDark/50">District</p>
            <p className="font-medium">{fir.district}</p>
          </div>
          <div>
            <p className="text-textDark/50">Police Station</p>
            <p className="font-medium">{fir.policeStation}</p>
          </div>
          <div>
            <p className="text-textDark/50">Crime Type</p>
            <p className="font-medium">{fir.crimeType}</p>
          </div>
          <div>
            <p className="text-textDark/50">Complainant</p>
            <p className="font-medium">{fir.complainantName}</p>
          </div>
          <div>
            <p className="text-textDark/50">Incident Date</p>
            <p className="font-medium">{new Date(fir.incidentDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-textDark/50">Location</p>
            <p className="font-medium">{fir.incidentLocation}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-textDark/50 text-sm mb-1">Description</p>
          <p className="text-sm">{fir.description}</p>
        </div>

        <div className="flex gap-2">
          {['open', 'under_investigation', 'closed', 'solved'].map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`text-xs px-3 py-1.5 rounded-full border ${
                fir.status === s
                  ? 'bg-button-gradient text-white border-transparent'
                  : 'border-border hover:bg-black/5'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default FIRDetail;