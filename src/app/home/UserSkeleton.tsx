const UserSkeleton = () => {
  return (
    <div  className="flex flex-col justify-center items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <p className='h-14 min-w-16 rounded-full border-2 border-gray-300 bg-gray-400 animate-pulse'> </p>
      <p className="text-textPrimary w-12 h-2.5 bg-gray-600 rounded-full animate-pulse"></p>
    </div>
  );
}

export default UserSkeleton;