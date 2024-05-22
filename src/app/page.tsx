// components/MessageList.js
"use client";

import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import WelcomePage from '../components/WelcomePage';

const MessageList = () => {
  const [pseudo, setPseudo] = useState('hakimJ');

  const messages = [
    { id: 1, name: 'Danny Hopkins', email: 'danny@youwe.com', time: '08:43', imgSrc: '/images/user.png' },
    { id: 2, name: 'Bobby Langford', email: 'bobby@example.com', time: 'Tue', imgSrc: '/images/user.png' },
    { id: 3, name: 'William Wiles', email: 'william@example.com', time: 'Sun', imgSrc: '/images/user.png' },
    // Add more messages here
  ];
  useEffect(() => {
    if(pseudo) localStorage.setItem('pseudo', pseudo);

    if (!pseudo) {
      setTimeout(() => {
        const pseudo = window.prompt('Entre ton pseudo');
        if (pseudo) {
          localStorage.setItem('pseudo', pseudo);
        }
      }, 1000);
    }

  }, []);

  return <WelcomePage />;
  return (
    <div className="min-h-screen bg-primary ">
      <div className="flex flex-col px-4 py-2">
        <h1 className="text-xl font-bold text-textPrimary">Messages</h1>
        <p className="text-textSecondary">Online</p>
      </div>
      <div className='w-full overflow-x-scroll flex gap-4 px-4'>
        <Link href="/22222" className=" flex flex-col ">
          <Image src="/images/user.png" alt="User" width={50} height={50} className='h-10 w-11 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">Danny</p>
        </Link>
        <div className="flex flex-col">
          <Image src="/images/user.png" alt="User" width={50} height={50} className='h-10 w-11 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">Danny</p>
        </div>
        <div className="flex flex-col">
          <Image src="/images/user.png" alt="User" width={50} height={50} className='h-10 w-11 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">Danny</p>
        </div>
        <div className="flex flex-col">
          <Image src="/images/user.png" alt="User" width={50} height={50} className='h-10 w-11 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">Danny</p>
        </div>
        <div className="flex flex-col">
          <Image src="/images/user.png" alt="User" width={50} height={50} className='h-10 w-11 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">Danny</p>
        </div>
        <div className="flex flex-col">
          <Image src="/images/user.png" alt="User" width={50} height={50} className='h-10 w-11 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">Danny</p>
        </div>
        <div className="flex flex-col">
          <Image src="/images/user.png" alt="User" width={50} height={50} className='h-10 w-11 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">Danny</p>
        </div>
        <div className="flex flex-col">
          <Image src="/images/user.png" alt="User" width={50} height={50} className='h-10 w-11 rounded-full border-2 border-green-500' />
          <p className="text-textPrimary">Danny</p>
        </div>
      </div>
      <div className='h-full flex flex-col gap-2 bg-secondary p-4 rounded-t-3xl mt-8'>
        <div className="flex gap-2 py-2 items-center justify-between">
          <div className="flex gap-2">
            <Image src="/images/user.png" alt="User" width={50} height={50} className='h-12 w-13 rounded-full' />
            <div className="flex flex-col gap-0">
              <p className="text-textPrimary">Danny</p>
              <p className="text-textSecondary">I am almost finish...</p>
            </div>
          </div>
          <p className="text-textSecondary">08:43</p>
        </div>
        <div className="flex gap-2 py-2 items-center justify-between">
          <div className="flex gap-2">
            <Image src="/images/user.png" alt="User" width={50} height={50} className='h-12 w-13 rounded-full' />
            <div className="flex flex-col gap-0">
              <p className="text-textPrimary">Danny</p>
              <p className="text-textSecondary">I am almost finish...</p>
            </div>
          </div>
          <p className="text-textSecondary">08:43</p>
        </div>
        <div className="flex gap-2 py-2 items-center justify-between">
          <div className="flex gap-2">
            <Image src="/images/user.png" alt="User" width={50} height={50} className='h-12 w-13 rounded-full' />
            <div className="flex flex-col gap-0">
              <p className="text-textPrimary">Danny</p>
              <p className="text-textSecondary">I am almost finish...</p>
            </div>
          </div>
          <p className="text-textSecondary">08:43</p>
        </div>
        <div className="flex gap-2 py-2 items-center justify-between">
          <div className="flex gap-2">
            <Image src="/images/user.png" alt="User" width={50} height={50} className='h-12 w-13 rounded-full' />
            <div className="flex flex-col gap-0">
              <p className="text-textPrimary">Danny</p>
              <p className="text-textSecondary">I am almost finish...</p>
            </div>
          </div>
          <p className="text-textSecondary">08:43</p>
        </div>
        <div className="flex gap-2 py-2 items-center justify-between">
          <div className="flex gap-2">
            <Image src="/images/user.png" alt="User" width={50} height={50} className='h-12 w-13 rounded-full' />
            <div className="flex flex-col gap-0">
              <p className="text-textPrimary">Danny</p>
              <p className="text-textSecondary">I am almost finish...</p>
            </div>
          </div>
          <p className="text-textSecondary">08:43</p>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
