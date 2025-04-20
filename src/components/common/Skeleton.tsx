const Skeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4 max-w-6xl mx-auto px-4 py-8 ">
      <div className="skeleton h-32 w-full dark:bg-white"></div>
      <div className="skeleton h-4 w-28 dark:bg-white"></div>
      <div className="skeleton h-4 w-full dark:bg-white"></div>
      <div className="skeleton h-4 w-full dark:bg-white"></div>
    </div>
  );
};

export default Skeleton;
