const EmptyPosts = () => {
  return (
    <div className="relative w-full h-96 overflow-hidden flex items-center justify-center ">
      {/* positionner au millieu */}
      <div className="bg-secondary text-white rounded-3xl text-center absolute w-10/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8">
        <h1 className="text-2xl  font-bold ">Aucun post trouvé</h1>
        <p className=" text-sm">Veuillez ajouter un post pour commencer</p>
      </div>
    </div>
  );
}

export default EmptyPosts;