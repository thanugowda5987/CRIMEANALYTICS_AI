import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../common/Card';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChartCard = ({ title, labels, dataset, color = '#5E3AAE' }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataset,
        borderColor: color,
        backgroundColor: `${color}22`,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#E5E7EB' } },
    },
  };

  return (
    <Card>
      <h4 className="font-heading font-semibold text-sm mb-3">{title}</h4>
      <Line data={data} options={options} />
    </Card>
  );
};

export default LineChartCard;