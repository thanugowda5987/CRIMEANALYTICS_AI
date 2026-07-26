import { useEffect, useState } from "react";
import KPISection from "../components/dashboard/KPISection";
import RecentFIRs from "../components/dashboard/RecentFIRs";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import CrimeByDistrictChart from "../components/charts/CrimeByDistrictChart";
import CrimeByCategoryChart from "../components/charts/CrimeByCategoryChart";
import MonthlyTrendChart from "../components/charts/MonthlyTrendChart";
import Loader from "../components/common/Loader";
import { getDashboardKPIs, getCrimeByDistrict, getCrimeByCategory, getMonthlyTrend } from "../api/analyticsApi";
import { getAllFIRs } from "../api/firApi";

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [districtData, setDistrictData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [recentFirs, setRecentFirs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setErrorMsg(null);
      const results = await Promise.allSettled([
        getDashboardKPIs(),
        getCrimeByDistrict(),
        getCrimeByCategory(),
        getMonthlyTrend(new Date().getFullYear()),
        getAllFIRs({ limit: 5 }),
      ]);

      const [kpiRes, districtRes, categoryRes, trendRes, firRes] = results;
      const failures = [];

      if (kpiRes.status === "fulfilled") {
        setKpis(kpiRes.value.data.data);
      } else {
        failures.push(`dashboard-kpis: ${kpiRes.reason?.response?.status || ""} ${kpiRes.reason?.response?.data?.message || kpiRes.reason?.message}`);
      }

      if (districtRes.status === "fulfilled") {
        setDistrictData(districtRes.value.data.data);
      } else {
        failures.push(`crime-by-district: ${districtRes.reason?.response?.status || ""} ${districtRes.reason?.response?.data?.message || districtRes.reason?.message}`);
      }

      if (categoryRes.status === "fulfilled") {
        setCategoryData(categoryRes.value.data.data);
      } else {
        failures.push(`crime-by-category: ${categoryRes.reason?.response?.status || ""} ${categoryRes.reason?.response?.data?.message || categoryRes.reason?.message}`);
      }

      if (trendRes.status === "fulfilled") {
        setTrendData(trendRes.value.data.data);
      } else {
        failures.push(`monthly-trend: ${trendRes.reason?.response?.status || ""} ${trendRes.reason?.response?.data?.message || trendRes.reason?.message}`);
      }

      if (firRes.status === "fulfilled") {
        setRecentFirs(firRes.value.data.data.firs);
      } else {
        failures.push(`firs: ${firRes.reason?.response?.status || ""} ${firRes.reason?.response?.data?.message || firRes.reason?.message}`);
      }

      if (failures.length) {
        console.error("Dashboard fetch failures:", failures);
        setErrorMsg(failures.join(" | "));
      }

      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white mb-1">
          Investigator Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Real-time overview of crime records and analytics.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-danger/10 text-danger text-sm px-4 py-3 rounded-xl border border-danger/20">
          Some data failed to load: {errorMsg}
        </div>
      )}

      <KPISection kpis={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyTrendChart data={trendData} />
        </div>
        <CrimeByCategoryChart data={categoryData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CrimeByDistrictChart data={districtData} />
        </div>
        <AlertsPanel />
      </div>

      <RecentFIRs firs={recentFirs} />
    </div>
  );
};

export default Dashboard;