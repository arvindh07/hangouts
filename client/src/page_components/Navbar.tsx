import { capitalizeWords } from "../utils/common";

interface NavbarProps {
  currentChat: any;
}

const Navbar = ({ currentChat }: NavbarProps) => {
  return (
    <div className="bg-slate-200 flex items-center px-6 p-3 rounded-sm h-1/6 max-h-[60px]">
      <img src={currentChat?.profilePic} alt="" className="w-7 h-7 rounded-full object-cover" />
      <div className="text-lg ml-5">{capitalizeWords(currentChat?.username)}</div>
    </div>
  )
}

export default Navbar