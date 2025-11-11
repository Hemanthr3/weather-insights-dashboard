export const ChartSkeleton = () => {
  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-lg p-6 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
      <div className="flex items-end justify-between h-[320px] gap-2">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gray-200 rounded-t"
            style={{ height: `${Math.random() * 80 + 20}%` }}
          />
        ))}
      </div>
    </div>
  );
};
