import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { getCrimeByDistrict } from '../api/dashboardApi';
import { getPrediction } from '../api/aiApi';

const Hotspots = () => {
  const [byDistrict, setByDistrict] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const d = await getCrimeByDistrict();
      setByDistrict(d.data.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const maxCount = Math.max(...byDistrict.map((d) => d.count), 1);

  const riskLevel = (count) => {
    const ratio = count / maxCount;
    if (ratio > 0.66) return { label: 'High', color: 'bg-danger' };
    if (ratio > 0.33) return { label: 'Medium', color: 'bg-warning' };
    return { label: 'Low', color: 'bg-success' };
  };

  const handlePredict = async () => {
    setPredicting(true);
    try {
      const res = await getPrediction({ scope: 'karnataka' });
      setPrediction(res.data.data);
    } catch {
      setPrediction({ message: 'AI prediction service integration pending.' });
    } finally {
      setPredicting(false);
    }
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
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-heading font-semibold">Crime Hotspots</h2>
        <button
          onClick={handlePredict}
          disabled={predicting}
          className="px-4 py-2 rounded-xl bg-button-gradient text-white text-sm disabled:opacity-60"
        >
          {predicting ? 'Predicting...' : 'Run Hotspot Prediction'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {byDistrict.map((d) => {
          const risk = riskLevel(d.count);
          return (
            <Card key={d._id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{d._id}</p>
                <p className="text-xs text-textDark/50">{d.count} recorded incidents</p>
              </div>
              <span className={`h-3 w-3 rounded-full ${risk.color}`} title={risk.label} />
            </Card>
          );
        })}
      </div>

      {prediction && (
        <Card>
          <h4 className="font-heading font-semibold text-sm mb-3">AI Prediction Result</h4>
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(prediction, null, 2)}</pre>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default Hotspots;