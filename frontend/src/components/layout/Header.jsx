import { Menu, Bell, Moon, Sun, Globe, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import useAuth from "../../hooks/useAuth";
import { getInitials } from "../../utils/helpers";
import SearchBar from "../common/SearchBar";
import { useNavigate } from "react-router-dom";

const Header = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, isAuthenticated, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [lang, setLang] = useState("EN");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm border-b border-borderLight dark:border-gray-700 px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 hover:text-primary transition-colors"
        >
          <Menu size={22} />
        </button>
        <SearchBar value={search} onChange={setSearch} placeholder="Search FIRs, criminals, cases..." />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setLang((prev) => (prev === "EN" ? "ಕನ್ನಡ" : "EN"))}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <Globe size={18} />
          <span>{lang}</span>
        </button>

        <button
          onClick={toggleTheme}
          className="text-gray-500 hover:text-primary transition-colors"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="relative text-gray-500 hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-danger rounded-full" />
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-button-gradient text-white flex items-center justify-center text-sm font-semibold">
              {getInitials(user?.name)}
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-danger transition-colors"
              title="Logout"
            >
              <LogOut size={19} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-button-gradient text-white text-sm font-medium px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;