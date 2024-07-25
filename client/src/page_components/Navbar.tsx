import { useDispatch } from "react-redux"
import { appActions } from "../store/slices/rootSlice";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  currentChat: string;
}
const Navbar = ({currentChat}: NavbarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(appActions?.setLogin(false));
    localStorage?.removeItem("user");
    navigate("/");
  }

  return (
    <div className="bg-slate-100 flex justify-between items-center px-6 my-3 p-3 rounded-sm">
      <div className="text-xl">{currentChat}</div>
      <button className="text-gray-600 hover:text-black" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar