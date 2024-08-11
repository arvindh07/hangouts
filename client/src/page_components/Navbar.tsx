interface NavbarProps {
  currentChat: string;
}

const Navbar = ({currentChat}: NavbarProps) => {
  return (
    <div className="bg-slate-100 flex justify-between items-center px-6 my-3 p-3 rounded-sm">
      <div className="text-xl">{currentChat}</div>
    </div>
  )
}

export default Navbar