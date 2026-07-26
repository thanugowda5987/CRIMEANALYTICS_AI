import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, trend, trendUp, gradient }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-card shadow-card border border-borderLight dark:border-gray-700 p-5 hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${
            gradient || "bg-button-gradient"
          }`}
        >
          {Icon && <Icon size={20} />}
        </div>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trendUp ? "text-success" : "text-danger"
            }`}
          >
            {trendUp ? "▲" : "▼"} {trend}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-heading font-semibold text-textDark dark:text-white">
        {value}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
    </motion.div>
  );
};

export default StatCard;