import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { setNavigate } from "./utils/global";
import Protected from "./pages/Protected";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  
  return (
    <Routes>
      <Route
        path="/"
        element={<Auth />} />
      <Route
        path="/chats"
        element={<Protected><Home /></Protected>} />
    </Routes>
  )
}

export default App;