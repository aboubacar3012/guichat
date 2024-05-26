"use client";
import CreateRoomForm from '@/src/components/CreateRoomForm';
import Hero from '@/src/components/Hero';
import { updateControl } from '@/src/redux/features/controlsSlice';
import { RootState } from '@/src/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageCardSkeletonList from './MessageCardSkeletonList';
import MessageCardList from './MessageCardList';
import UserProfile from './UserProfile';
import UserProfileList from './UserProfileList';
import { UserType } from '@/src/types/user.type';
import UserSkeletonList from './UserSkeletonList';


const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [isRoomsLoading, setIsRoomsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [displayedChannel, setDisplayedChannel] = useState('public'); // public or private

  const roomsToShow = rooms && rooms.length > 0 ? rooms.filter((room: any) => {
    if (displayedChannel === 'public') return room.type === 'public';
    return room.type === "privateTwo" || room.type === "privateGroup";
  }) : [];



  const getRooms = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${auth.user?.username}`,);
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




  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.username) {
      getRooms();
      getUsers();
    } else {
      return router.push(`/`);
    }
  }, []);

  return (
    <div className="h-screen-safe bg-primary ">
      <CreateRoomForm />
      <Hero />
      <div className="flex flex-col px-4 py-2">
        <p className="text-textSecondary">Utilisateurs</p>
      </div>
      <div className='w-full overflow-x-scroll justify-start items-center flex gap-4 px-4'>
        <UserProfile user={auth.user as UserType} isMe />
        {isUsersLoading && <UserSkeletonList />}
        <UserProfileList users={users} />
      </div>
      {/* Chanels privée et public */}
      <div className="flex flex-col gap-2 px-4 py-2 mt-8">
        <h1 className="text-xl font-bold text-textPrimary">Canaux</h1>
        <div className="flex w-2/3 ">
          <button onClick={() => setDisplayedChannel("public")} className={`w-1/2 ${displayedChannel === "public" ? "bg-accent" : "bg-secondary"} text-textPrimary py-2 rounded-2xl rounded-r-none`}>Public</button>
          <button onClick={() => setDisplayedChannel("private")} className={`w-1/2 ${displayedChannel === "private" ? "bg-accent" : "bg-secondary"} text-textPrimary py-2 rounded-2xl rounded-l-none`}>Privés</button>
        </div>
      </div>
      <div className='h-[24rem] flex flex-col gap-2 bg-secondary p-4 rounded-t-3xl overflow-y-auto'>
        {isRoomsLoading && <MessageCardSkeletonList />}
        {roomsToShow && roomsToShow.length === 0 && <p className="text-textPrimary text-center">Aucun canal trouvé</p>}
        <MessageCardList rooms={roomsToShow} />
      </div>
    </div>
  );
};

export default HomePage;
