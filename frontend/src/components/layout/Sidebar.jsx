import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  FileText,
  Users,
  Briefcase,
  Map,
  FileBarChart,
  ShieldAlert,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ai-chat', label: 'AI Assistant', icon: MessageSquare },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/firs', label: 'FIR Search', icon: FileText },
  { to: '/criminals', label: 'Criminal Records', icon: Users },
  { to: '/cases', label: 'Cases', icon: Briefcase },
  { to: '/hotspots', label: 'Crime Hotspots', icon: Map },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/audit-logs', label: 'Audit Logs', icon: ShieldAlert },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar-gradient text-white p-4">
      <div className="flex items-center gap-2 px-2 py-4 mb-4">
        <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center font-heading font-bold">
          KSP
        </div>
        <div>
          <p className="font-heading font-semibold text-sm leading-tight">KSP AI</p>
          <p className="text-xs text-white/70 leading-tight">Crime Analytics</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10 text-white/85'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="text-xs text-white/50 px-2 pt-4">v1.0 · Government Use Only</div>
    </aside>
  );
};

export default Sidebar;