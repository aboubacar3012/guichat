"use client";

import { useEffect, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type SendMsgFormProps = {
  chatId: string;
  message: string;
  setMessage: (message: string) => void;
};

const SendMsgForm = (
  { chatId, message, setMessage }: SendMsgFormProps
) => {

  const [username, setUsername] = useState('');
  const auth = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if(auth.isAuthenticated && auth.username) setUsername(auth.username);
  }, []);

  const sendMessage = async () => {
    if (!message && message.length <= 1) {
      alert('Vous devez entrer un message');
      return;
    }
    
    console.log('sending message');
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomId: chatId,
        message: message,
        username: username
      })
    }).finally(() => setMessage(''));
  };

  return (
    <div>
      <input
        aria-multiline={true}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Entrez votre message ..."
        className="focus:border-none relative w-full bg-secondary text-textPrimary px-4 py-4 rounded-t-3xl"
      />
      <VscSend onClick={sendMessage} className="h-12 w-12 absolute right-4 top-6 bg-accent text-textPrimary p-2 rounded-full" />
    </div>
  );
}

export default SendMsgForm;