import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateControl } from "../redux/features/controlsSlice";

const CreateRoomForm = () => {
  const [name, setName] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);


  const showRoomForm = useSelector((state: RootState) => state.controls.values.showRoomForm);


  const createRoom = async () => {
    if (!name) {
      alert('Vous devez entrer un nom de canal');
      return;
    }
    if (name.length <= 4) {
      alert('Le nom du canal doit contenir au moins 5 caractères');
      return;
    }
    const username = auth?.user?.username;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomName: name,
        username: username
      })
    }).then((response) => {
      if (!response.ok) {
        alert('Une erreur est survenue, veuillez réessayer');
        return;
      }
      dispatch(updateControl({ showRoomForm: false }))
      window.location.reload();
    });
  }

  if (!showRoomForm) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="relative m-4 w-4/5  rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
        <div
          className="flex items-center justify-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
          Créer un canal
        </div>
        <div
          className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
          <div className="flex flex-col gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              placeholder="Nom du canal"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
          <button
            onClick={() => dispatch(updateControl({ showRoomForm: false }))}
            className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Annuler
          </button>
          <button
            onClick={createRoom}
            className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomForm;