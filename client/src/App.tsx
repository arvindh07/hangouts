import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ThemeProvider } from "./pages/ThemeProvider";
import { Toaster } from "./components/ui/toaster";

function App() {
  const userLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn) 
    || localStorage?.getItem("user");

  const router = createBrowserRouter([
    {
      path: "/",
      element: !userLoggedIn ? <Auth /> : <Navigate to="/chats" replace={true} />
    },
    {
      path: "/chats",
      element: userLoggedIn ? <Home /> : <Navigate to="/" replace={true} />
    }
  ])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}

export default App;