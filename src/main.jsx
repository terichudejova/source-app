import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";



const router = createBrowserRouter([
  {
    path: "/source-app/",
    element: <App/>,
    children: [
      {
        path: "/source-app/",
        element: <Home/>
      },
      {
        path: "/source-app/about",
        element: <About />
      },
      {
        path: "/source-app/contact",
        element: <Contact />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
