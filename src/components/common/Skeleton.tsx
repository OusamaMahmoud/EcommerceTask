interface SkeletonProps {
  height?: string;
  width?: string;
  className?: string;
}

const Skeleton = ({
  height = "h-32",
  width = "w-full",
  className = "dark:bg-white",
}: SkeletonProps) => {
  return (
    <div className={`flex w-full flex-col gap-4 max-w-6xl mx-auto px-4 py-8 ${className}`}>
      <div className={`skeleton ${height} ${width}`}></div>
      <div className={`skeleton h-4 w-28 ${className}`}></div>
      <div className={`skeleton h-4 w-full ${className}`}></div>
      <div className={`skeleton h-4 w-full ${className}`}></div>
    </div>
  );
};

export default Skeleton;
