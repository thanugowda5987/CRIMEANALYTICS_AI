const Card = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`glass rounded-card p-5 dark:bg-slate-800/60 dark:border-slate-700 ${
        hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;