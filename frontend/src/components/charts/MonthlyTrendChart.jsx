import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Card from "../common/Card";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MonthlyTrendChart = ({ data = [] }) => {
  const counts = Array(12).fill(0);
  data.forEach((item) => {
    counts[item._id - 1] = item.count;
  });

  const chartData = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: "Crime Reports",
        data: counts,
        borderColor: "#5E3AAE",
        backgroundColor: "rgba(94, 58, 174, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#5E3AAE",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#E5E7EB" } },
    },
  };

  return (
    <Card hover={false}>
      <h3 className="font-heading font-semibold text-textDark dark:text-white mb-4">
        Monthly Crime Trend
      </h3>
      <Line data={chartData} options={options} />
    </Card>
  );
};

export default MonthlyTrendChart;