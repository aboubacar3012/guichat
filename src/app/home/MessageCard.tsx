"use client";

import { formatTime } from "@/src/libs/format-date";
import { RootState } from "@/src/redux/store";
import { RoomType } from "@/src/types/room.type";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

type RoomProps = {
  room: RoomType;
}
const MessageCard = ({ room }: RoomProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const joinRoom = async (roomId: string) => {
    if (!auth.user?.username) {
      alert('Vous devez entrer un username');
      return router.push('/');
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomId: roomId,
        username: auth.user?.username
      })
    }).then((response) => {
      if (!response.ok) {
        alert('Une erreur est survenue, veuillez réessayer');
        return;
      }
      router.push(`/message/${roomId}`);
    });
  }

  const getOtherUserInTwoChat = (room: RoomType) => {
    const otherUser = room.roomMembers.find((member) => member.username !== auth.user?.username);
    if (!otherUser) return '';
    return otherUser.username;
  }

  return (
    <div>
      <div onClick={async () => await joinRoom(room.id)} className="flex py-2 items-center justify-between">
        <div className="w-10/12 flex gap-2 justify-start items-center">
          <p className={`h-12 w-1/5 bg-black text-white rounded-full flex justify-center items-center text-3xl`}>{room.roomName[0]}</p>
          <div className="w-4/5 flex flex-col gap-0">
            <p className="text-textPrimary">
              {room.roomName}
              <span className={`${room.type !== "privateTwo" && "hidden"}`}> avec {getOtherUserInTwoChat(room)}</span>
              <span className={`${room.type !== "privateGroup" && "hidden"}`}> de Groupe</span>
            </p>
            <p className="w-10/12 text-textSecondary truncate ...">{room.roomMessages[room.roomMessages.length - 1]?.message}</p>
          </div>
        </div>
        <p className="w-2/12 text-textSecondary">{formatTime(room.roomMessages[room.roomMessages.length - 1]?.timestamp)}</p>
        {/* divider */}
      </div>
      <div className="absolute right-0 w-4/5 h-0.5 bg-gray-700"></div>
    </div>
  );
}

export default MessageCard;