import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "../common/Card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CrimeByDistrictChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map((d) => d.district),
    datasets: [
      {
        label: "Total Crimes",
        data: data.map((d) => d.totalCrimes),
        backgroundColor: "#5E3AAE",
        borderRadius: 8,
        maxBarThickness: 28,
      },
      {
        label: "Resolved",
        data: data.map((d) => d.resolved),
        backgroundColor: "#1ABC9C",
        borderRadius: 8,
        maxBarThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { usePointStyle: true } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#E5E7EB" } },
    },
  };

  return (
    <Card hover={false}>
      <h3 className="font-heading font-semibold text-textDark dark:text-white mb-4">
        Crime by District
      </h3>
      <Bar data={chartData} options={options} />
    </Card>
  );
};

export default CrimeByDistrictChart;