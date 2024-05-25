"use client"
import { updateControl } from "@/src/redux/features/controlsSlice";
import { RootState } from "@/src/redux/store";
import { useDispatch, useSelector } from "react-redux";
const Hero = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-full flex items-center justify-between p-2">
      <div className="flex flex-col gap-2 w-3/5">
        <h1 className="text-xl text-white font-bold">Bonjour, {auth.user?.username}</h1>
        <p className="text-white text-xs">
          Avez vous quelque chose à partager ?
        </p>
      </div>
      {/* add post button */}
      <button onClick={() => dispatch(updateControl({ showPostForm: true }))} className="bg-blue-500 text-white px-4 py-2 rounded-full text-2xl">+</button>
    </div>
  );
}

export default Hero;