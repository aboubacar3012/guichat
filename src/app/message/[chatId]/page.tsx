"use client"
import Image from 'next/image'
import { VscSend } from "react-icons/vsc";
import { Keyboard } from '@capacitor/keyboard';
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';
import SendMsgForm from '@/src/app/message/[chatId]/SendMsgForm';
import { formatDate, formatTime } from '@/src/libs/format-date';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import TwoChatLoading from '@/src/components/LoadingOverlay';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MessageType } from '@/src/types/message.type';




const ChatWindow = (
  { params }: { params: { chatId: string } }
) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messageEndRef = useRef<HTMLInputElement>(null);
  const [roomName, setRoomName] = useState('');
  const auth = useSelector((state: RootState) => state.auth);


  const router = useRouter();

  const chatId = params.chatId;



  const getRoomMessages = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/room/${chatId}`);
    const data = await response.json();
    console.log(data);
    setMessages(data.roomMessages);
    setRoomName(data.roomName);
  }


  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.username) {
      getRoomMessages();
      setUsername(auth.user?.username);
    } else {
      return router.push(`/`);
    }
  }, []);



  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "eu",
    });

    var channel = pusher.subscribe(chatId);
    channel.bind("incoming-message", function (data: any) {
      console.log(data)
      // const parsedComments = JSON.parse(data.message);
      // console.log(parsedComments);
      const message = {
        message: data.message,
        username: data.username,
        timestamp: data.timestamp
      }
      if (data) setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    return () => {
      pusher.unsubscribe(chatId);
    };
  }, []);


  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }
    , [messages]);

  if (!chatId) {
    return <div>Chat not found</div>;
  }

  if (!messages) return <TwoChatLoading />
  return (
    <div className="relative h-screen-safe flex justify-center overflow-hidden">

      {/* Head */}
      <div className="fixed flex w-full gap-4 py-4 justify-between items-center p-4 bg-primary">
        <Link href="/home" className=' text-white'>
          <IoMdArrowRoundBack className="font-light h-10 w-10" />
        </Link>
        {/* <Image src="/images/user.png" alt="User" width={50} height={50} className='h-12 w-13 rounded-full' /> */}
        <p className="text-textPrimary text-lg font-semibold">
          {roomName}
        </p>
        <p></p>
      </div>

      {/* Body */}
      <div className="w-full flex flex-col overflow-y-scroll p-4 pt-20">
        {/* <p className="text-textSecondary py-4 text-center">
          {formatDate(new Date().toString())}
        </p> */}
        {
          messages && messages.map((msg, index) => (
            <div key={index} className={`w-4/5 flex flex-col gap-2  text-textPrimary p-4 rounded-2xl my-2 ${msg.username === username ? 'self-end bg-blue-500' : 'bg-secondary'}`}>
              {msg.username !== username && <p className="font-semibold text-gray-500">{msg.username}</p>}
              <p className="w-full break-words">
                {msg.message}
              </p>
              <p className="font-semibold text-right text-xs">
                {formatTime(msg.timestamp)}
              </p>
            </div>
          ))
        }
        <div className='mt-28' ref={messageEndRef}></div>
      </div>

      {/* Bottom */}
      <div className="absolute max-w-[430px] bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-secondary rounded-t-[20px] p-4">
        <SendMsgForm chatId={chatId} message={message} setMessage={setMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
