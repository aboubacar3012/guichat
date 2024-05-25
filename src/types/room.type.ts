import { MessageType } from "./message.type";


export type RoomType = {
  id: string;
  roomName: string;
  roomMembers: { username: string, _id?: string }[];
  roomMessages: MessageType[];
  type: string;
  createdAt?: string;
  updatedAt?: string;
};