import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Card from "../common/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#5E3AAE",
  "#234B8C",
  "#1ABC9C",
  "#2ECC71",
  "#F39C12",
  "#E74C3C",
  "#7B52D6",
  "#3566B0",
];

const CrimeByCategoryChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: COLORS.slice(0, data.length),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right", labels: { usePointStyle: true, boxWidth: 8 } },
    },
  };

  return (
    <Card hover={false}>
      <h3 className="font-heading font-semibold text-textDark dark:text-white mb-4">
        Crime by Category
      </h3>
      <Pie data={chartData} options={options} />
    </Card>
  );
};

export default CrimeByCategoryChart;