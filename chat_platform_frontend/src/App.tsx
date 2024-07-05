import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />


  },
  {
    path: '/register',
    element: <Register />

  },
  {
    path: '/chat',
    element: <Chat />

  },
]);

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
