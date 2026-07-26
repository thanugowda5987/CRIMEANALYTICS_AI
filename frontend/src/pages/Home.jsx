import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";
import QuickActions from "../components/dashboard/QuickActions";
import KPISection from "../components/dashboard/KPISection";
import CrimeByDistrictChart from "../components/charts/CrimeByDistrictChart";
import CrimeByCategoryChart from "../components/charts/CrimeByCategoryChart";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import Button from "../components/common/Button";

const DEMO_KPIS = {
  totalFIRs: 1284,
  solvedCases: 792,
  pendingCases: 356,
  totalCrimeReports: 2140,
};

const DEMO_DISTRICT_DATA = [
  { district: "Bengaluru Urban", totalCrimes: 420, resolved: 310 },
  { district: "Mysuru", totalCrimes: 180, resolved: 140 },
  { district: "Belagavi", totalCrimes: 150, resolved: 95 },
  { district: "Dakshina Kannada", totalCrimes: 110, resolved: 88 },
  { district: "Kalaburagi", totalCrimes: 95, resolved: 60 },
];

const DEMO_CATEGORY_DATA = [
  { category: "Theft", count: 340 },
  { category: "Cyber Crime", count: 260 },
  { category: "Assault", count: 180 },
  { category: "Fraud", count: 150 },
  { category: "Burglary", count: 120 },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-sidebar-gradient text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_60%,white,transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm mb-6"
          >
            <ShieldCheck size={16} />
            Karnataka State Police — Official Intelligence Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl md:text-5xl font-semibold max-w-3xl leading-tight"
          >
            Intelligent Crime Analytics & Conversational AI Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-white/80 max-w-2xl"
          >
            Empowering Karnataka State Police with AI-driven investigation, crime
            prediction, and real-time intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <Button variant="primary" size="lg" onClick={() => navigate("/dashboard")}>
              Launch Dashboard
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={Sparkles}
              onClick={() => navigate("/ai-chat")}
              className="!border-white !text-white hover:!bg-white/10"
            >
              Try AI Assistant
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="font-heading text-xl font-semibold text-textDark dark:text-white mb-6">
          Quick Actions
        </h2>
        <QuickActions />
      </section>

      {/* KPI Section */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <h2 className="font-heading text-xl font-semibold text-textDark dark:text-white mb-6">
          Platform Overview
        </h2>
        <KPISection kpis={DEMO_KPIS} />
      </section>

      {/* Analytics Section */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <h2 className="font-heading text-xl font-semibold text-textDark dark:text-white mb-6">
          Crime Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CrimeByDistrictChart data={DEMO_DISTRICT_DATA} />
          </div>
          <CrimeByCategoryChart data={DEMO_CATEGORY_DATA} />
        </div>
      </section>

      {/* Alerts Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="font-heading text-xl font-semibold text-textDark dark:text-white mb-6">
          Latest Alerts
        </h2>
        <AlertsPanel />
      </section>
    </div>
  );
};

export default Home;