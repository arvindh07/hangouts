import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Redirect from "./pages/Redirect";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const userLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Redirect user={userLoggedIn} />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "auth",
          element: <Auth />
        }
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App;