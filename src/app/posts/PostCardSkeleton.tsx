const PostCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-2 bg-secondary rounded-2xl m-2">
      <div className="flex gap-2 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="flex flex-col gap-2">
          <div className="h-2 w-20 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-2 w-full bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="h-3 w-full bg-gray-300 rounded-full animate-pulse"></div>
      <div className="h-3 w-4/5 bg-gray-300 rounded-full animate-pulse"></div>
      <div className="h-3 w-3/5 bg-gray-300 rounded-full animate-pulse"></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="h-96 w-full bg-gray-300 rounded-3xl animate-pulse"></div>
      <div className="flex gap-4">
        <button className="text-white flex gap-1">
          <span className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></span>
          <span className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></span>
        </button>
        <button className="text-white flex gap-1">
          <span className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></span>
          <span className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></span>
        </button>
      </div>
    </div>
  );
}

export default PostCardSkeleton;