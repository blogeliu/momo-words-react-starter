import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ensureSampleData } from './lib/sample'

export default function App() {
  useEffect(() => { ensureSampleData() }, [])
  return (
    <div className="container">
      <nav className="nav">
        <div className="brand">MoMo Words • React</div>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/decks">Decks</NavLink>
        <NavLink to="/review">Review</NavLink>
        <NavLink to="/stats">Stats</NavLink>
        <a className="btn" href="https://vitejs.dev/guide/" target="_blank" rel="noreferrer">Vite Guide</a>
      </nav>
      <div className="card">
        <Outlet />
      </div>
    </div>
  )
}
