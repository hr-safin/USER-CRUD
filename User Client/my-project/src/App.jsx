import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import User from "./Components/User/User";
import Updated from "./Components/Updated/Updated";

function App() {
  
  const router =  createBrowserRouter([
    {
      path : "/",
      element : <Layout />,
      children : [
        {
          path : "/",
          element : <Home />
        },
        {
          path : "/user",
          element : <User />,
          loader : () => fetch("http://localhost:5000/users")
        },
        {
          path : "/users/:id",
          element : <Updated />,
          loader : ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
