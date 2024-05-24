"use client";

import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";

const Hero = () => {
  
  return (
    <div className="bg-black  text-white px-2 py-4 flex flex-col items-center justify-center w-full rounded-b-[50px] leading-10">
      <Link href="/" className='absolute top-2 left-4 text-white'>
        <IoMdArrowRoundBack className="font-light h-10 w-10" />
      </Link>
      <h1 className="text-xl font-bold">
        Discussions
      </h1>
    </div>
  );
}

export default Hero;