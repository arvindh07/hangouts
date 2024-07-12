import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./app_components/Home";
import Login from "./app_components/Login";
import { useState } from "react";


function App() {
  const [userLoggedIn, _] = useState<boolean>(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: userLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        }
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App;