"use client";

import { useEffect, useState } from "react";
import { VscSend } from "react-icons/vsc";

type SendMsgFormProps = {
  chatId: string;
  message: string;
  setMessage: (message: string) => void;
};

const SendMsgForm = (
  { chatId, message, setMessage }: SendMsgFormProps
) => {

  const [pseudo, setPseudo] = useState('');

  useEffect(() => {
    const pseudo = localStorage.getItem('pseudo');
    console.log('pseudo', pseudo)
    if(pseudo) setPseudo(pseudo);
  }, []);

  const sendMessage = async () => {
    if(!message && message.length <= 1) {
      alert('Vous devez entrer un message');
      return;
    }
    const hour = new Date().toLocaleTimeString()[0] + new Date().toLocaleTimeString()[1];
    const minute = new Date().toLocaleTimeString()[3] + new Date().toLocaleTimeString()[4];
    console.log('sending message')
    fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        chatId: chatId,
        message: message,
        sender: pseudo,
        time: `${hour}:${minute}`
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