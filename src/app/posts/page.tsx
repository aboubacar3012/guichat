"use client"
import CreatePostForm from "@/src/app/posts/CreatePostForm";
import { useEffect, useState } from "react";
import { PostType } from "@/src/types/post.type";
import { sortinPostByDate } from "@/src/libs/sortingPostByDate";
import PostList from "./PostList";
import PostCardSkeletonList from "./PostCardSkeletonList";
import EmptyPosts from "./EmptyPosts";
import Hero from "./Hero";

const PostsPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const getPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    const data = await response.json();
    const posts = sortinPostByDate(data.posts);
    setPosts(posts);
    setIsLoadingPosts(false);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="min-h-screen bg-primary w-full pb-28">
      <CreatePostForm posts={posts} setPosts={setPosts} />
      <Hero />
      {/* divider */}
      <div className="w-full h-2 bg-secondary"></div>
      {/* posts */}
      {
        isLoadingPosts && <PostCardSkeletonList />
      }
      {
        !isLoadingPosts && posts.length === 0 && <EmptyPosts />
      }
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default PostsPage;