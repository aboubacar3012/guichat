const MessageCardSkeleton = () => {
  return (
    <div className="flex py-2 items-center justify-between">
    <div className="w-10/12 flex gap-2 justify-start items-center">
      <div className={`h-12 w-1/5 bg-black text-white rounded-full flex justify-center items-center text-3xl`}>
        <p className="text-3xl animate-pulse bg-gray-600 h-8 w-6 rounded-full"></p>
      </div>
      <div className="w-4/5 flex flex-col gap-4">
        <p className="text-textPrimary w-28 h-2.5 bg-gray-600 rounded-full animate-pulse"></p>
        <p className="text-textPrimary w-48 h-2.5 bg-gray-600 rounded-full animate-pulse"></p>
      </div>
    </div>
    <p className="w-8 h-2.5 bg-gray-600 rounded-full animate-pulse"></p>
  </div>
  );
}

export default MessageCardSkeleton;