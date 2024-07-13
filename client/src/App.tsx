import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./app_components/Home";
import Auth from "./app_components/Auth";
import { useState } from "react";
import Redirect from "./app_components/Redirect";

function App() {
  const [userLoggedIn, _] = useState<boolean>(true);

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