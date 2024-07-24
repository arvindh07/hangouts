import { useDispatch } from "react-redux"
import { appActions } from "../store/slices/rootSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(appActions?.setLogin(false));
    localStorage?.removeItem("user");
    navigate("/");
  }

  return (
    <div className="bg-slate-100 flex justify-between items-center px-6 my-3 p-3">
      <div className="text-xl">Vinisha</div>
      <button className="text-gray-600 hover:text-black" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar