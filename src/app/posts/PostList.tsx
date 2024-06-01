"use client"

import { sortinPostByDate } from "@/src/libs/sortingPostByDate";
import { PostType } from "@/src/types/post.type";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PostCardSkeleton from "./PostCardSkeleton";
import PostCard from "./PostCard";
import PostCardSkeletonList from "./PostCardSkeletonList";

type PostListProps = {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}

const PostList = ({ posts, setPosts }: PostListProps) => {

  return (
    posts && posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))
  );
}


export default PostList;