import { useState } from 'react';
import { Bell, Moon, Sun, Search, Globe, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [lang, setLang] = useState('EN');

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-border dark:border-slate-700 sticky top-0 z-30">
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <Search size={18} className="text-textDark/40" />
        <input
          type="text"
          placeholder="Search FIRs, cases, criminals..."
          className="w-full bg-transparent text-sm focus:outline-none placeholder:text-textDark/40 dark:text-white"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setLang((l) => (l === 'EN' ? 'KN' : 'EN'))}
          className="flex items-center gap-1 text-sm px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
        >
          <Globe size={16} /> {lang}
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-danger rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-border dark:border-slate-700">
          <div className="h-8 w-8 rounded-full bg-button-gradient text-white flex items-center justify-center text-sm font-medium">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-tight">{user?.name || 'User'}</p>
            <p className="text-xs text-textDark/50 leading-tight capitalize">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;