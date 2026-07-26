import { useEffect, useState } from "react";
import CrimeByDistrictChart from "../components/charts/CrimeByDistrictChart";
import CrimeByCategoryChart from "../components/charts/CrimeByCategoryChart";
import MonthlyTrendChart from "../components/charts/MonthlyTrendChart";
import Loader from "../components/common/Loader";
import { getCrimeByDistrict, getCrimeByCategory, getMonthlyTrend } from "../api/analyticsApi";

const Analytics = () => {
  const [districtData, setDistrictData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [d, c, t] = await Promise.allSettled([
          getCrimeByDistrict(),
          getCrimeByCategory(),
          getMonthlyTrend(new Date().getFullYear()),
        ]);
        if (d.status === "fulfilled") setDistrictData(d.value.data.data);
        if (c.status === "fulfilled") setCategoryData(c.value.data.data);
        if (t.status === "fulfilled") setTrendData(t.value.data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">
          Crime Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          District, category, and time-based crime trends.
        </p>
      </div>

      <MonthlyTrendChart data={trendData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CrimeByDistrictChart data={districtData} />
        </div>
        <CrimeByCategoryChart data={categoryData} />
      </div>
    </div>
  );
};

export default Analytics;