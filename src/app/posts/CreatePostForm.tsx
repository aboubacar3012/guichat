"use client"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateControl } from "../../redux/features/controlsSlice";
import { PostType } from "../../types/post.type";

type CreatePostFormProps = {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}

const CreatePostForm = ({ posts, setPosts }: CreatePostFormProps) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const showPostForm = useSelector((state: RootState) => state.controls.values.showPostForm);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createPost = async () => {
    if (!text || text.trim() === '') {
      alert('Vous devez ajouter une description');
      return;
    }
    if (text.length < 5) {
      alert('La description doit contenir au moins 5 caractères');
      return;
    }

    if (!file) {
      alert('Vous devez ajouter une image');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: text,
        image: file,
        userId: auth?.user?.id
      })
    }).then((response) => {
      if (!response.ok) {
        alert('Une erreur est survenue, veuillez réessayer');
        return;
      }
      dispatch(updateControl({ showPostForm: false }))
      const newPost = {
        content: text,
        image: file as string,
        user: auth?.user as any,
        createdAt: new Date().toISOString()
      };
      // add the new post to the top of the posts array
      const newPosts = [newPost, ...posts];
      setPosts(newPosts);
      setText('');
      setFile(null);
    });
  }

  if (!showPostForm) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="relative m-4 w-4/5  rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
        <div
          className="flex items-center justify-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
          Créer une publication
        </div>
        <div
          className=" p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-16 overflow-y-auto p-2 font-sans text-base font-light leading-relaxed text-blue-gray-500 resize-none border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ajouter  une description..."></textarea>
          {/* appercu de l'image */}
          {file && <img src={file as string} alt="preview" className="w-full h-48 object-cover rounded-lg my-1" />}
          <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} className="w-full p-2 my-1 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
          <button
            onClick={() => dispatch(updateControl({ showPostForm: false }))}
            className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Annuler
          </button>
          <button
            onClick={createPost}
            className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostForm;