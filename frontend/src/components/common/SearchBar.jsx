import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-full border border-borderLight dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-textDark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
      />
    </div>
  );
};

export default SearchBar;