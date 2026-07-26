import { FileText, CheckCircle, Clock, Activity } from "lucide-react";
import StatCard from "../common/StatCard";

const KPISection = ({ kpis }) => {
  const data = kpis || {
    totalFIRs: 0,
    solvedCases: 0,
    pendingCases: 0,
    totalCrimeReports: 0,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Total FIRs"
        value={data.totalFIRs}
        icon={FileText}
        gradient="bg-gradient-to-br from-primary to-secondary"
      />
      <StatCard
        title="Solved Cases"
        value={data.solvedCases}
        icon={CheckCircle}
        gradient="bg-gradient-to-br from-success to-accent"
        trend="4.2%"
        trendUp
      />
      <StatCard
        title="Pending Cases"
        value={data.pendingCases}
        icon={Clock}
        gradient="bg-gradient-to-br from-warning to-danger"
      />
      <StatCard
        title="Total Crime Reports"
        value={data.totalCrimeReports}
        icon={Activity}
        gradient="bg-gradient-to-br from-secondary to-primary"
      />
    </div>
  );
};

export default KPISection;