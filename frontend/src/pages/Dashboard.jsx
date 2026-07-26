import { useEffect, useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  Search,
  AlertTriangle,
  Users,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/common/StatCard';
import LineChartCard from '../components/charts/LineChartCard';
import BarChartCard from '../components/charts/BarChartCard';
import PieChartCard from '../components/charts/PieChartCard';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import {
  getStats,
  getCrimeByDistrict,
  getCrimeByMonth,
  getCrimeByCategory,
  getRecentActivity,
} from '../api/dashboardApi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [byDistrict, setByDistrict] = useState([]);
  const [byMonth, setByMonth] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [recent, setRecent] = useState({ recentFIRs: [], recentCases: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, d, m, c, r] = await Promise.all([
          getStats(),
          getCrimeByDistrict(),
          getCrimeByMonth(),
          getCrimeByCategory(),
          getRecentActivity(),
        ]);
        setStats(s.data.data);
        setByDistrict(d.data.data.data);
        setByMonth(m.data.data.data);
        setByCategory(c.data.data.data);
        setRecent(r.data.data);
      } finally {
        setLoading(false);
      }
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
      <h2 className="text-xl font-heading font-semibold mb-5">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard icon={FileText} label="Total FIRs" value={stats.totalFIRs} />
        <StatCard icon={CheckCircle2} label="Solved Cases" value={stats.solvedCases} gradient="bg-success" />
        <StatCard icon={Clock} label="Pending Cases" value={stats.pendingCases} gradient="bg-warning" />
        <StatCard icon={Search} label="Active Investigations" value={stats.activeInvestigations} />
        <StatCard icon={AlertTriangle} label="Wanted Criminals" value={stats.wantedCriminals} gradient="bg-danger" />
        <StatCard icon={Users} label="Active Alerts" value={stats.activeAlerts} gradient="bg-secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2">
          <LineChartCard
            title="Crime Trend (Monthly)"
            labels={byMonth.map((m) => `${m._id.month}/${m._id.year}`)}
            dataset={byMonth.map((m) => m.count)}
          />
        </div>
        <PieChartCard
          title="Crime by Category"
          labels={byCategory.map((c) => c._id)}
          dataset={byCategory.map((c) => c.count)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <BarChartCard
          title="Crime by District"
          labels={byDistrict.map((d) => d._id)}
          dataset={byDistrict.map((d) => d.count)}
        />

        <Card>
          <h4 className="font-heading font-semibold text-sm mb-3">Recent Activity</h4>
          <ul className="space-y-2 text-sm max-h-64 overflow-y-auto">
            {recent.recentFIRs.map((f) => (
              <li key={f._id} className="flex justify-between border-b border-border/60 pb-2">
                <span>FIR {f.firNumber} — {f.crimeType}</span>
                <span className="text-textDark/50">{f.district}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;