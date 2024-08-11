import { capitalizeWords } from "../utils/common";

interface NavbarProps {
  currentChat: string;
}

const Navbar = ({currentChat}: NavbarProps) => {
  return (
    <div className="bg-slate-100 flex justify-between items-center px-6 my-3 p-3 rounded-sm h-1/6 max-h-[60px]">
      <div className="text-xl">{capitalizeWords(currentChat)}</div>
    </div>
  )
}

export default Navbar