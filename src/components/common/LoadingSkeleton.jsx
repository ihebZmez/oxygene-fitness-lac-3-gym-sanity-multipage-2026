const LoadingSkeleton = ({ count = 3, className = "" }) => (
  <div className={`grid md:grid-cols-3 gap-6 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="bg-gym-bg-light rounded-2xl h-80 animate-pulse border border-gym-border"
      />
    ))}
  </div>
);

export default LoadingSkeleton;
