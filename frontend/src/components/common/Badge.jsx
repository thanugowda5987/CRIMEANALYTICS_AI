const Badge = ({ text, colorClass = "bg-gray-100 text-gray-600" }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      {text}
    </span>
  );
};

export default Badge;