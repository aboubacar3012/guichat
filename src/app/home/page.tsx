// components/MessageList.js
"use client";

import { getRandomAvatar } from '@/src/avatars';
import { getBgColorByLetter } from '@/src/colors';
import CreateRoomForm from '@/src/components/CreateRoomForm';
import Hero from '@/src/components/Hero';
import MessageCardSkeleton from '@/src/components/MessageCardSkeleton';
import LoadingOverlay from '@/src/components/LoadingOverlay';
import UserSkeleton from '@/src/components/UserSkeleton';
import { formatTime } from '@/src/libs/format-date';
import { updateControl } from '@/src/redux/features/controlsSlice';
import { RootState } from '@/src/redux/store';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [isRoomsLoading, setIsRoomsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [loadingTwoChat, setLoadingTwoChat] = useState(false);
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [displayedChannel, setDisplayedChannel] = useState('public'); // public or private

  const roomsToShow = rooms && rooms.length > 0 ? rooms.filter((room: any) => {
    if (displayedChannel === 'public') return room.type === 'public';
    return room.type === "privateTwo" || room.type === "privateGroup";
  }) : [];

  const getOtherUserInTwoChat = (room: any) => {
    const otherUser = room.roomMembers.find((member: any) => member.username !== auth.username);
    if (!otherUser) return '';
    return otherUser.username;
  }

  const getRooms = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${auth.username}`,);
    const rooms = await response.json();
    setRooms(rooms);
    setIsRoomsLoading(false);
  }

  const getUsers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    const users = await response.json();
    setUsers(users);
    setIsUsersLoading(false);
  }

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
      router.push(`/${data.room.id}`);
    } catch (e) {
      alert('Une erreur est survenue, veuillez réessayer');
      setLoadingTwoChat(false);
    }
  }

  const joinRoom = async (roomId: string) => {
    if (!auth.username) {
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
        username: auth.username
      })
    }).then((response) => {
      if (!response.ok) {
        alert('Une erreur est survenue, veuillez réessayer');
        return;
      }
      router.push(`/${roomId}`);
    });
  }

  useEffect(() => {
    if (auth.isAuthenticated && auth.username) {
      getRooms();
      getUsers();
    } else {
      return router.push(`/`);
    }
  }, []);


  console.log(getRandomAvatar());
  console.log(getBgColorByLetter('P'));

  return (
    <div className="min-h-screen bg-primary ">
      {
        loadingTwoChat && <LoadingOverlay />
      }
      <CreateRoomForm />
      <Hero />
      <div className="flex flex-col px-4 py-2">
        <p className="text-textSecondary">Utilisateurs</p>
      </div>
      <button
        className="z-50 flex justify-center items-center fixed top-2 right-4 bg-blue-500 text-3xl text-white px-4  rounded-2xl"
        onClick={() => dispatch(updateControl({ showRoomForm: true }))}
      >
        +
      </button>
      <div className='w-full overflow-x-scroll justify-start items-center flex gap-4 px-4'>
        <div className="w-full flex flex-col justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://api.dicebear.com/8.x/bottts/svg?seed=Patches" alt="User" className='h-14 min-w-16 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">{auth.username}(Moi)</p>
        </div>
        {isUsersLoading && (
          <>
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
          </>
        )}
        {users && users.map((user: any) => user.username !== auth.username ? (
          <div onClick={async () => joinTwoChat(auth.username, user.username)} key={user.id} className=" flex flex-col justify-center items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.icon} alt="User" className='h-14 min-w-16 rounded-full border-2 border-gray-500' />
            <p className="text-textPrimary">{user.username}</p>
          </div>
        ) : null)}

      </div>
      {/* Chanels privée et public */}
      <div className="flex flex-col gap-2 px-4 py-2 mt-8">
        <h1 className="text-xl font-bold text-textPrimary">Canaux</h1>
        <div className="flex w-2/3 ">
          <button onClick={() => setDisplayedChannel("public")} className={`w-1/2 ${displayedChannel === "public" ? "bg-accent" : "bg-secondary"} text-textPrimary py-2 rounded-2xl rounded-r-none`}>Public</button>
          <button onClick={() => setDisplayedChannel("private")} className={`w-1/2 ${displayedChannel === "private" ? "bg-accent" : "bg-secondary"} text-textPrimary py-2 rounded-2xl rounded-l-none`}>Privés</button>
        </div>
      </div>
      <div className='h-full flex flex-col gap-2 bg-secondary p-4 rounded-t-3xl'>
        {isRoomsLoading && (
          <>
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
          </>
        )}
        {roomsToShow && roomsToShow.length === 0 && <p className="text-textPrimary text-center">Aucun canal trouvé</p>}
        {
          roomsToShow && roomsToShow.map((room: any) => {
            return (
              <div key={room.id}>
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
            )
          })
        }
      </div>
    </div>
  );
};

export default HomePage;
