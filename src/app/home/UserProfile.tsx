import LoadingOverlay from "@/src/components/LoadingOverlay";
import { addUserProfile } from "@/src/redux/features/authSlice";
import { RootState } from "@/src/redux/store";
import { UserType } from "@/src/types/user.type";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type UserProfileProps = {
  user: UserType;
  isMe?: boolean;
}

const UserProfile = ({ user, isMe }: UserProfileProps) => {
  const [file, setFile] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingTwoChat, setLoadingTwoChat] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // @ts-ignore
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onClick = async () => {
    if (isMe) inputRef.current?.click();
    else await joinTwoChat(auth?.user?.username as string, user.username);
  }

  useEffect(() => {
    if (file) {
      dispatch(addUserProfile(file));
    }
  }, [file]);

  if (!user) return null;
  return (
    <>
      <input ref={inputRef} type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} className="w-full p-2 my-1 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" hidden />
      {
        loadingTwoChat && <LoadingOverlay />
      }
      <div onClick={onClick} key={user.id} className=" flex flex-col justify-center items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.icon} alt="User" className='h-14 min-w-16 max-w-16 rounded-full border-2 border-gray-500' />
        <p className="text-textPrimary">{user.username}{isMe && "(Moi)"} </p>
      </div>
    </>
  );
}

export default UserProfile;