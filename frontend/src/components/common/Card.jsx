const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-card shadow-card border border-borderLight dark:border-gray-700 p-6 transition-all duration-300 ${
        hover ? "hover:shadow-soft hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;