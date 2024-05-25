import { formatDistanceToNow } from "@/src/libs/format-date";
import { PostType } from "@/src/types/post.type";
import { BiCommentDetail } from "react-icons/bi";
import { IoHeart } from "react-icons/io5";

type PostCardProps = {
  post: PostType;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="flex flex-col gap-4 p-2 bg-secondary rounded-2xl m-2">
      <div className="flex gap-2 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post?.user.icon} alt="user" className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-1">
          <p className="text-white font-bold">{post?.user?.username}</p>
          <p className="text-white text-xs">{formatDistanceToNow(post.createdAt as string)}</p>
        </div>
      </div>
      <p className="text-white">
        {post?.content}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post?.image as string} alt="post" className="w-full h-96 object-cover rounded-3xl" />
      <div className="flex gap-4">
        <button className="text-white flex gap-1">
          <IoHeart className="text-red-500 h-6 w-6" />
          {Math.floor(Math.random() * 100)}
        </button>
        <button className="text-white flex gap-1">
          <BiCommentDetail className="h-6 w-6" />
          {Math.floor(Math.random() * 10)}
        </button>
      </div>
    </div>
  );
}

export default PostCard;