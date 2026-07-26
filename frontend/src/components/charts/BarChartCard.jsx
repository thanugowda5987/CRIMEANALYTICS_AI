import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../common/Card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const palette = ['#5E3AAE', '#234B8C', '#1ABC9C', '#F39C12', '#2ECC71'];

const BarChartCard = ({ title, labels, dataset }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataset,
        backgroundColor: labels.map((_, i) => palette[i % palette.length]),
        borderRadius: 8,
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
      <Bar data={data} options={options} />
    </Card>
  );
};

export default BarChartCard;