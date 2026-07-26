import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import LineChartCard from '../components/charts/LineChartCard';
import BarChartCard from '../components/charts/BarChartCard';
import PieChartCard from '../components/charts/PieChartCard';
import Loader from '../components/common/Loader';
import { getCrimeByDistrict, getCrimeByMonth, getCrimeByCategory } from '../api/dashboardApi';
import { getAIAnalytics } from '../api/aiApi';

const Analytics = () => {
  const [byDistrict, setByDistrict] = useState([]);
  const [byMonth, setByMonth] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [d, m, c] = await Promise.all([
        getCrimeByDistrict(),
        getCrimeByMonth(),
        getCrimeByCategory(),
      ]);
      setByDistrict(d.data.data.data);
      setByMonth(m.data.data.data);
      setByCategory(c.data.data.data);

      try {
        const ai = await getAIAnalytics();
        setAiInsights(ai.data.data);
      } catch {
        setAiInsights(null);
      }

      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader size="lg" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-xl font-heading font-semibold mb-5">Crime Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <LineChartCard
          title="Crime Trend (Monthly)"
          labels={byMonth.map((m) => `${m._id.month}/${m._id.year}`)}
          dataset={byMonth.map((m) => m.count)}
        />
        <BarChartCard
          title="Crime by District"
          labels={byDistrict.map((d) => d._id)}
          dataset={byDistrict.map((d) => d.count)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PieChartCard
          title="Crime by Category"
          labels={byCategory.map((c) => c._id)}
          dataset={byCategory.map((c) => c.count)}
        />

        <div className="glass rounded-card p-5 dark:bg-slate-800/60">
          <h4 className="font-heading font-semibold text-sm mb-3">AI-Generated Insights</h4>
          {aiInsights ? (
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(aiInsights, null, 2)}</pre>
          ) : (
            <p className="text-sm text-textDark/50">
              AI analytics service integration pending — placeholder endpoint only.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;