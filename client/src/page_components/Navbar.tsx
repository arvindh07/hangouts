import { IoMdArrowRoundBack } from "react-icons/io";
import { capitalizeWords } from "../utils/common";

interface NavbarProps {
  currentChat: any;
  setChatListScreen: any;
}

const Navbar = ({ currentChat, setChatListScreen }: NavbarProps) => {
  return (
    <div className="bg-slate-400 flex items-center px-6 py-3 sticky top-0">
      <div className="text-white md:hidden mr-2">
        <IoMdArrowRoundBack onClick={() => setChatListScreen((prev: any) => !prev)} />
      </div>
      <img src={currentChat?.profilePic} alt="" className="w-7 h-7 rounded-full object-cover" />
      <div className="text-lg ml-5">{capitalizeWords(currentChat?.username)}</div>
    </div>
  )
}

export default Navbar