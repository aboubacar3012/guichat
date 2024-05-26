"use client";

import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateControl } from "../redux/features/controlsSlice";

const Hero = () => {
  const dispatch = useDispatch();

  return (
    <div className="relative bg-black  text-white px-2 py-4 flex flex-col items-center justify-center w-full rounded-b-[50px] leading-10">
      <Link href="/" className='absolute top-2 left-4 text-white'>
        <IoMdArrowRoundBack className="font-light h-10 w-10" />
      </Link>
      <button
        className="z-50 flex justify-center items-center absolute top-2 right-4 bg-blue-500 text-3xl text-white px-4  rounded-2xl"
        onClick={() => dispatch(updateControl({ showRoomForm: true }))}
      >
        +
      </button>
      <h1 className="text-xl font-bold">
        Discussions
      </h1>
    </div>
  );
}

export default Hero;