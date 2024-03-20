import React from 'react'
import { NavLink } from 'react-router-dom'

const activeLink = ({ isActive }) => (isActive ? "active" : "link");

const Sidebaritem = ({item}) => {
  const Icon = item.icon;
  return (
    <div className="sidebar-item">
      <div className="sidebar-item-content">
     
        <NavLink to={item.path} className="sidebar-link">
        <div style={{ display: 'flex', alignItems: 'center' }}>
         <span className='mr-2 sidebar-icon'>{item.icon}</span>
          <span className='title'>{item.title}</span>
        </div>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebaritem
