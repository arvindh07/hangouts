const UserInteraction = () => {
  return (
    <div className="max-h-[50px] flex w-8/12 mx-auto justify-between">
        <input type="text" className="border-2 border-black rounded-md py-2 px-4 w-10/12 mr-8"/>
        <button 
            className="ml-4 w-2/12 rounded-md cursor-pointer hover:bg-slate-400 bg-gray-950 px-4 text-white">
            Send
        </button>
    </div>
  )
}

export default UserInteraction;