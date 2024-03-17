import React from 'react'
import { NavLink } from 'react-router-dom'

const activeLink = ({ isActive }) => (isActive ? "active" : "link");

const Sidebaritem = ({item}) => {
  console.log(item.icon)
  const Icon = item.icon;
  return (
    <div className='bg-red'>

<div className='bg-red sidebar-item'>
      <NavLink to={item.path} className={activeLink}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon style={{ marginRight: '0.5rem' }} /> {/* Render the icon component */}
          <span className='title'>{item.title}</span>
        </div>
      </NavLink>
    </div>
      
    </div>
  )
}

export default Sidebaritem
