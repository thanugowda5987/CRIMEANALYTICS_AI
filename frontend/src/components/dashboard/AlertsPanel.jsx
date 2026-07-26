import { AlertTriangle, UserX, ShieldAlert, Wifi } from "lucide-react";
import Card from "../common/Card";

const alerts = [
  {
    icon: UserX,
    title: "Missing Person Reported",
    location: "Mysuru District",
    time: "2 hours ago",
    color: "text-warning bg-warning/10",
  },
  {
    icon: ShieldAlert,
    title: "Wanted Criminal Spotted",
    location: "Bengaluru Urban",
    time: "5 hours ago",
    color: "text-danger bg-danger/10",
  },
  {
    icon: Wifi,
    title: "Cyber Crime Alert",
    location: "Mangaluru",
    time: "1 day ago",
    color: "text-secondary bg-secondary/10",
  },
  {
    icon: AlertTriangle,
    title: "High Risk Zone Identified",
    location: "Belagavi District",
    time: "1 day ago",
    color: "text-primary bg-primary/10",
  },
];

const AlertsPanel = () => {
  return (
    <Card hover={false}>
      <h3 className="font-heading font-semibold text-textDark dark:text-white mb-4">
        Latest Alerts
      </h3>
      <div className="space-y-3">
        {alerts.map(({ icon: Icon, title, location, time, color }, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-bgLight dark:hover:bg-gray-700 transition-colors"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon size={17} />
            </div>
            <div>
              <p className="text-sm font-medium text-textDark dark:text-white">{title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {location} • {time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertsPanel;