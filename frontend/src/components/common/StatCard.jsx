import Card from './Card';

const StatCard = ({ icon: Icon, label, value, trend, trendUp = true, gradient }) => {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm text-textDark/60 dark:text-slate-300">{label}</p>
        <h3 className="text-2xl font-heading font-semibold mt-1">{value}</h3>
        {trend && (
          <span
            className={`text-xs font-medium ${trendUp ? 'text-success' : 'text-danger'}`}
          >
            {trendUp ? '▲' : '▼'} {trend}
          </span>
        )}
      </div>
      {Icon && (
        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center text-white ${
            gradient || 'bg-button-gradient'
          }`}
        >
          <Icon size={22} />
        </div>
      )}
    </Card>
  );
};

export default StatCard;