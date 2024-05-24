// components/MessageList.js
"use client";

import { getRandomAvatar } from '@/src/avatars';
import { getBgColorByLetter } from '@/src/colors';
import Hero from '@/src/components/Hero';
import { formatTime } from '@/src/libs/format-date';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const HomePage = () => {
  const [username, setUsername] = useState('');
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  const users = [
    { id: 1, username: 'Tanos', avatarSrc: getRandomAvatar() },
    { id: 2, username: 'Safia', avatarSrc: getRandomAvatar() },
    { id: 3, username: 'Sherwins', avatarSrc: getRandomAvatar() },
    { id: 4, username: 'Bobby', avatarSrc: getRandomAvatar() },
    { id: 5, username: 'William', avatarSrc: getRandomAvatar() },
    { id: 6, username: 'Danny', avatarSrc: getRandomAvatar() },
    { id: 7, username: 'John', avatarSrc: getRandomAvatar() },
    { id: 8, username: 'Bobby', avatarSrc: getRandomAvatar() },
    { id: 9, username: 'William', avatarSrc: getRandomAvatar() },
    { id: 10, username: 'Danny', avatarSrc: getRandomAvatar() },
    { id: 11, username: 'John', avatarSrc: getRandomAvatar() },
    { id: 12, username: 'Bobby', avatarSrc: getRandomAvatar() },
    { id: 13, username: 'William', avatarSrc: getRandomAvatar() },
    { id: 14, username: 'Danny', avatarSrc: getRandomAvatar() },
    { id: 15, username: 'John', avatarSrc: getRandomAvatar() },
    { id: 16, username: 'Bobby', avatarSrc: getRandomAvatar() },
    { id: 17, username: 'William', avatarSrc: getRandomAvatar() },
    { id: 18, username: 'Danny', avatarSrc: getRandomAvatar() },
    { id: 19, username: 'John', avatarSrc: getRandomAvatar() },
    { id: 20, username: 'Bobby', avatarSrc: getRandomAvatar() },
  ]


  const getRooms = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
    const rooms = await response.json();
    setRooms(rooms);
  }

  const joinRoom = async (roomId: string) => {
    if (!username) {
      alert('Vous devez entrer un username');
      return router.push('/');
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomId: roomId,
        username: username
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
    const username = localStorage.getItem('username');
    if (!username) {
      return router.push('/');
    }
    setUsername(username);
  }, []);

  useEffect(() => {
    getRooms();
  }, []);


  console.log(getRandomAvatar());
  console.log(getBgColorByLetter('P'));

  return (
    <div className="min-h-screen bg-primary ">
      <Hero />
      <div className="flex flex-col px-4 py-2">
        <p className="text-textSecondary">Utilisateurs</p>
      </div>
      <button
        className="z-50 fixed bottom-4 right-4 bg-blue-500 text-3xl text-white px-6 py-3 rounded-2xl"
        onClick={() => {
          alert("Cette fonctionnalité n'est pas encore disponible, plus tard vous pourrez creer un groupe et ajouter vos amis")
        }}
      >
        +
      </button>
      <div className='w-full overflow-x-scroll justify-start items-center flex gap-4 px-4'>
        <div className="w-full flex flex-col justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://api.dicebear.com/8.x/bottts/svg?seed=Patches" alt="User" className='h-10 min-w-12 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">Moi</p>
        </div>
        {users.map((user) => (
          <div onClick={() => {
            alert("Cette fonctionnalité n'est pas encore disponible, plus tard vous pourrez discuter avec " + user.username + " en privé.")
          }} key={user.id} className=" flex flex-col justify-center items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.avatarSrc} alt="User" className='h-10 w-12 rounded-full border-2 border-green-200' />
            <p className="text-textPrimary">{user.username}</p>
          </div>
        ))}

      </div>
      {/* Chanels privée et public */}
      <div className="flex flex-col gap-2 px-4 py-2 mt-8">
        <h1 className="text-xl font-bold text-textPrimary">Canaux</h1>
        <div className="flex w-2/3 ">
          <button className="w-1/2 bg-accent text-textPrimary py-2 rounded-2xl rounded-r-none">Public</button>
          <button className="w-1/2 bg-secondary text-textPrimary py-2 rounded-2xl rounded-l-none">Privée</button>
        </div>
      </div>
      <div className='h-full flex flex-col gap-2 bg-secondary p-4 rounded-t-3xl'>
        {
          rooms && rooms.map((room: any) => {
            if (room.type !== 'public') return;
            return (
              <div onClick={async () => await joinRoom(room.id)} key={room.id} className="flex py-2 items-center justify-between">
                <div className="w-10/12 flex gap-2 justify-start items-center">
                  <p className={`h-12 w-1/5 bg-black text-white rounded-full flex justify-center items-center text-3xl`}>P</p>
                  <div className="w-4/5 flex flex-col gap-0">
                    <p className="text-textPrimary">{room.roomName}</p>
                    <p className="w-10/12 text-textSecondary truncate ...">{room.roomMessages[room.roomMessages.length - 1].message}</p>
                  </div>
                </div>
                <p className="w-2/12 text-textSecondary">{formatTime(room.roomMessages[room.roomMessages.length - 1].timestamp)}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default HomePage;
