import { RoomType } from "@/src/types/room.type";
import MessageCard from "./MessageCard";
type RoomProps = {
  rooms: RoomType[];
}
const MessageCardList = ({ rooms }: RoomProps) => {
  return (
    <>
      {
        rooms && rooms.map((room: RoomType) => <MessageCard key={room.id} room={room} />)
      }
    </>
  );
}

export default MessageCardList;