import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from '../common/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

const palette = ['#5E3AAE', '#234B8C', '#1ABC9C', '#F39C12', '#E74C3C', '#2ECC71'];

const PieChartCard = ({ title, labels, dataset }) => {
  const data = {
    labels,
    datasets: [
      {
        data: dataset,
        backgroundColor: labels.map((_, i) => palette[i % palette.length]),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } },
  };

  return (
    <Card>
      <h4 className="font-heading font-semibold text-sm mb-3">{title}</h4>
      <Pie data={data} options={options} />
    </Card>
  );
};

export default PieChartCard;