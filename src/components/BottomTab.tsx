"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { updateControl, clearControls } from "@/src/redux/features/controlsSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { FaThList } from "react-icons/fa";


const BottomTab = () => {
  const pathname = usePathname()
  const dispatch = useDispatch();

  if (pathname === "/" || pathname.includes("/message")) return null;
  console.log(pathname)

  return (
    <div className="bg-secondary text-black absolute bottom-4 inset-x-0  flex flex-row justify-around items-center py-2 shadow-xl w-11/12 m-auto rounded-[50px]">
      <Link href="/home" className={`flex flex-col items-center ${pathname === "/home" ? "text-blue-500" : "text-white"}`}>
        <AiFillMessage className="h-8 w-8" />
        <p className="text-md ">Discussions</p>
      </Link>
      <Link href="/posts" className={`flex flex-col items-center ${pathname === "/posts" ? "text-blue-500" : "text-white"}`}>
        <FaThList className="h-8 w-8" />
        <p className="text-md ">Publications</p>
      </Link>
    </div>

  );
}

export default BottomTab;