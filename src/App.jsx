import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, NavLink } from 'react-router-dom'

function App() {


  return (
    <div>
      <h1>Source App</h1>
      <nav>
        <NavLink to="/source-app/">Home</NavLink>
        {" | "}
        <NavLink to="/source-app/about">About</NavLink>
        {" | "}
        <NavLink to="/source-app/contact">Contact</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
