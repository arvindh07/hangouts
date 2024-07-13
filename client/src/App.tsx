import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useState } from "react";
import Redirect from "./pages/Redirect";

function App() {
  const [userLoggedIn, _] = useState<boolean>(false);

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