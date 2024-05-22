"use client"
import Image from 'next/image'
import { VscSend } from "react-icons/vsc";
import { Keyboard } from '@capacitor/keyboard';
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';
import SendMsgForm from '@/src/components/SendMsgForm';
import { formatDate } from '@/src/libs/format-date';

type Message = {
  message: string;
  sender: string;
  time: string;
}


const ChatWindow = (
  { params }: { params: { chatId: string } }
) => {
  const [pseudo, setPseudo] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<HTMLInputElement>(null);

  const chatId = params.chatId;

  // useEffect(() => {
  //   Keyboard.addListener('keyboardWillShow', (info) => {
  //     console.log('keyboard will show with height:', info.keyboardHeight);
  //     document.body.style.setProperty('--keyboard-height', `${info.keyboardHeight}px`);
  //   });

  //   Keyboard.addListener('keyboardWillHide', () => {
  //     console.log('keyboard will hide');
  //     document.body.style.removeProperty('--keyboard-height');
  //   });
  // }, []);


  useEffect(() => {
    const pseudo = localStorage.getItem('pseudo');
    if (pseudo) setPseudo(pseudo);
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
        sender: data.sender,
        time: data.time
      }
      setMessages((prev) => [...prev, message]);
      scrollTobottom();
    });

    return () => {
      pusher.unsubscribe(chatId);
    };
  }, []);


  const scrollTobottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!chatId) {
    return <div>Chat not found</div>;
  }

  


  return (
    <div className="relative h-screen bg-primary overflow-hidden">
      <div className="flex gap-4 py-2 justify-center items-center p-4">
        {/* <Image src="/images/user.png" alt="User" width={50} height={50} className='h-12 w-13 rounded-full' /> */}
        <p className="text-textPrimary text-lg font-semibold">Chat Room</p>
      </div>
      <div className='flex flex-col p-4'>
        <p className="text-textSecondary py-4 text-center">
          {formatDate(new Date().toString())}
        </p>
        <div className="scrollable-content overflow-y-auto h-full pb-20">
          {
            messages.map((msg, index) => (
              <div key={index} className={`w-4/5 flex flex-col gap-2  text-textPrimary p-4 rounded-2xl my-2 ${msg.sender === pseudo ? 'self-end bg-blue-500' : 'bg-secondary'}`}>
                {msg.sender !== pseudo && <p className="font-semibold text-gray-500">{msg.sender}</p>}
                <p className="w-full break-words">
                  {msg.message}
                </p>
                <p className="font-semibold text-right text-xs">
                  {msg.time}
                </p>
              </div>
            ))
          }
        </div>
      </div>

      {/* chat input */}
      <div className="fixed max-w-[430px] bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-secondary rounded-t-[20px] p-4">
      <SendMsgForm chatId={chatId} message={message} setMessage={setMessage} />
      </div>
      <div className='mt-28' ref={messageEndRef}></div>
    </div>
  );
};

export default ChatWindow;
