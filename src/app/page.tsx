"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRandomAvatar } from '@/src/avatars';
import { useDispatch, useSelector } from "react-redux";
import { addUsername, isAuthenticated, login } from "../redux/features/authSlice";
import { RootState } from "../redux/store";
import LoadingOverlay from "../components/LoadingOverlay";


const WelcomePage = () => {
  const [username, setUsername] = useState('');
  const [errorMesaage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);



  const startChat = () => {
    if (auth.isAuthenticated && auth.username && auth.username === username) return router.push(`/home`);
    // alert("Reviens dans quelques minutes, le nombre de participants est limité pour le moment. Merci de ta comprehension.")
    // return;
    if (!username) {
      setErrorMessage('Vous devez entrer un username');
      return;
    }
    if (username.length <= 1) {
      setErrorMessage('Votre username doit contenir au moins 2 caractères');
      return;
    }

    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        icon: getRandomAvatar(),
        username: username
      })
    }).then((response) => {
      if (!response.ok) {
        alert('Une erreur est survenue, veuillez réessayer');
        return;
      }
      setUsername('')
      dispatch(login({ username: username, isAuthenticated: true }));
      setIsLoading(false);
      router.push(`/home`);
    });

  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.username) setUsername(auth.username);
  }, [auth]);

  useEffect(() => {
    if (errorMesaage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMesaage]);

  return (
    <div className="relative h-screen flex justify-center">
      {
        isLoading && <LoadingOverlay />
      }
      {/* Le nom de mon entreprrise */}
      <img
        src="https://img.freepik.com/free-vector/vector-social-contact-seamless-pattern-white-blue_1284-41919.jpg?t=st=1716406541~exp=1716410141~hmac=3f12a8325a047bb43430a5454861b203fbfc8272e4f33b251ab21743df8f245e&w=826"
        alt="homeV2"
        // width={1920}
        // height={1080}
        className="object-cover w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
      <div className="absolute top-28 text-center">
        <h1 className="text-5xl text-white font-bold">Guichat</h1>
        <p className="text-white text-md">Connectez-vous et discutez avec vos amis</p>
      </div>
      <div className="absolute flex flex-col justify-center items-center gap-4 bottom-16 left-1/2 transform -translate-x-1/2  w-full px-4">
        <p className="text-white text-lg text-center px-1">
          Guichat est une application de messagerie instantanée qui vous permet de discuter avec vos amis en temps réel.
        </p>
        <p className="text-yellow-400 text-lg text-center mb-10 px-1">
          {/* Cette application est sécurisée et respecte votre vie privée. */}
          Cette application est en cours de développement, mais vous pouvez deja le tester en integrant le chat de test.
        </p>

        <div className="w-4/5 flex flex-col gap-2">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="title"
            name="title"
            placeholder="Entrez votre username"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        {errorMesaage && <p className="text-red-500 text-sm">{errorMesaage}</p>}
        <button onClick={startChat} type="button" className="bg-blue-500  text-white font-bold py-4 px-12 rounded-[20px] w-4/5 text-center ">
          Démarrer le chat
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
