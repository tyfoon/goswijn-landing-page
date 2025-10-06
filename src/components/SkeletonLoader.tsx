export const SkeletonLoader = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-20 rounded-lg bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer bg-[length:1000px_100%]"
        />
      ))}
    </div>
  );
};
