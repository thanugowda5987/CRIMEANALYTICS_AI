const Loader = ({ size = 'md' }) => {
  const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };

  return (
    <div className="flex items-center justify-center w-full py-6">
      <div
        className={`${sizes[size]} border-4 border-primary/20 border-t-primary rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;