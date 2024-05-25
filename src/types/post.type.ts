import { UserType } from "./user.type";

export type PostType = {
  id?: string;
  content: string;
  image: string;
  user: UserType;
  createdAt?: string;
  updatedAt?: string;
};