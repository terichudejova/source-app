import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import "./App.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import ExternalApi from "./pages/ExternalApi.jsx";
import Registration from "./pages/Registration.jsx";
import LocalStorageList from './pages/LocalStorageList.jsx';
import LocalApi from './pages/LocalApi.jsx';
import Post from './pages/Post.jsx';
import EditPost from './pages/EditPost.jsx';
import StatusManagement from './pages/StatusManagement.jsx';



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
        path: "/source-app/externalapi",
        element: <ExternalApi />
      },
      {
        path: "/source-app/localstorage",
        element: <LocalStorageList />
      },
      {
        path: "/source-app/registration",
        element: <Registration />
      },
      {
        path: "/source-app/localapi",
        element: <LocalApi />
      },
      {
        path: "/source-app/api/:id",
        element: <Post />
      },
      {
        path: "/source-app/api/:id/edit",
        element: <EditPost />
      },
      {
        path: "/source-app/management",
        element: <StatusManagement />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
