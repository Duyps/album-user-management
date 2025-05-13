import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './sidebar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAddressCard, faTableList, faUsers} from "@fortawesome/free-solid-svg-icons";


function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 990);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 990);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setOpen(!open);
  const closeSidebar = () => setOpen(false);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const iconOnly = collapsed & !isMobile;
  return (
    <>
    {isMobile && (
      <button className='menu-button' onClick={toggleSidebar}>
        ☰
      </button>
    )}

    {(isMobile && open) && <div className='overlay' onClick={closeSidebar}></div>}

    <div className={`sidebar ${isMobile ? (open ? 'show' : 'hide') : ''} ${collapsed ? 'collapsed' : ''}`}>
        {isMobile && (
          <div className="logo">
            <Link to="/"><img src="https://geekup.vn/Icons/geekup-logo-general.svg" alt="" /></Link>
          </div>
        )}
        

        <nav className='nav'>
            <NavLink to="/albums" className={({isActive}) => isActive ? "nav-link active": "nav-link"}>
              <FontAwesomeIcon icon={faTableList} />
              {!iconOnly && <span>Albums</span> }
              
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <FontAwesomeIcon icon={faAddressCard} />
              {!iconOnly && <span>Users</span>}
            </NavLink>

            {!isMobile && (
              <button className="collapse-btn" onClick={toggleCollapse}>
                {collapsed ? '>' : '<'}
              </button>
            )}
        </nav>

        
    </div>
    </>
  )
}

export default Sidebar