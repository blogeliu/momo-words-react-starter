import React from 'react'
import { Link, Outlet, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <div className="container">
      <nav className="nav">
        <div className="brand">MoMo Words • React</div>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <a className="btn" href="https://vitejs.dev/guide/" target="_blank" rel="noreferrer">Vite Guide</a>
      </nav>
      <div className="card">
        <Outlet />
      </div>
    </div>
  )
}
