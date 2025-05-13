import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

function Header() {
  return (
    <div className="header">
        <div className="logo">
            <Link to="/"><img src="https://geekup.vn/Icons/geekup-logo-general.svg" alt="" /></Link>
        </div>
    </div>
  )
}

export default Header