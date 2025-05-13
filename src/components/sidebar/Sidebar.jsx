import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './sidebar.css'

function Sidebar() {
  return (
    <div className="sidebar">
        <div className="logo">
            <Link to="/"><img src="https://geekup.vn/Icons/geekup-logo-general.svg" alt="" /></Link>
        </div>
        <nav className='nav'>
            <NavLink to="/albums" className={({isActive}) => isActive ? "nav-link active": "nav-link"}>Albums</NavLink>
            <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Users</NavLink>
        </nav>
    </div>
  )
}

export default Sidebar