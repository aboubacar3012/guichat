import LoadingOverlay from "@/src/components/LoadingOverlay";
import { RootState } from "@/src/redux/store";
import { UserType } from "@/src/types/user.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

type UserProfileProps = {
  user: UserType;
  isMe?: boolean;
}

const UserProfile = ({ user, isMe }: UserProfileProps) => {
  const [loadingTwoChat, setLoadingTwoChat] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const joinTwoChat = async (usernameOne: string, usernameTwo: string) => {
    setLoadingTwoChat(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/twochat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usernameOne: usernameOne,
          usernameTwo: usernameTwo
        })
      });
      const data = await response.json();
      setLoadingTwoChat(false);
      console.log(data.room.id)
      router.push(`/message/${data.room.id}`);
    } catch (e) {
      alert('Une erreur est survenue, veuillez réessayer');
      setLoadingTwoChat(false);
    }
  }

  return (
    <>
      {
        loadingTwoChat && <LoadingOverlay />
      }
      <div onClick={async () => joinTwoChat(auth?.user?.username as string, user.username)} key={user.id} className=" flex flex-col justify-center items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.icon} alt="User" className='h-14 min-w-16 rounded-full border-2 border-gray-500' />
        <p className="text-textPrimary">{user.username}{isMe && "(Moi)"} </p>
      </div>
    </>
  );
}

export default UserProfile;