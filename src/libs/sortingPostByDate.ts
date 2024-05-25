import { PostType } from "../types/post.type";

export const sortinPostByDate = (posts: PostType[]) => {
  return posts.sort((a, b) => {
    // @ts-ignore
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}