import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  BarChart3,
  FileText,
  Search,
  Users,
  Fingerprint,
  Briefcase,
  Map,
  TrendingUp,
} from "lucide-react";

const actions = [
  { label: "AI Chatbot", icon: MessageSquare, path: "/ai-chat", gradient: "from-primary to-secondary" },
  { label: "Crime Analytics", icon: BarChart3, path: "/analytics", gradient: "from-secondary to-accent" },
  { label: "Predict Crime", icon: TrendingUp, path: "/crime-prediction", gradient: "from-accent to-primary" },
  { label: "FIR Search", icon: FileText, path: "/firs", gradient: "from-primary to-accent" },
  { label: "Criminal Records", icon: Fingerprint, path: "/criminals", gradient: "from-secondary to-primary" },
  { label: "Cases", icon: Briefcase, path: "/cases", gradient: "from-accent to-secondary" },
  { label: "Evidence", icon: Map, path: "/evidence", gradient: "from-primary to-secondary" },
  { label: "Officers", icon: Users, path: "/officers", gradient: "from-secondary to-accent" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {actions.map(({ label, icon: Icon, path, gradient }, idx) => (
        <motion.button
          key={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          onClick={() => navigate(path)}
          className="bg-white dark:bg-gray-800 rounded-card border border-borderLight dark:border-gray-700 p-5 flex flex-col items-center gap-3 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
        >
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center`}
          >
            <Icon size={22} />
          </div>
          <span className="text-sm font-medium text-textDark dark:text-white text-center">
            {label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;