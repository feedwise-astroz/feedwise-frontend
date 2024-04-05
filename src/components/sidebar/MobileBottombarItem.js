import React from 'react'
import { NavLink } from 'react-router-dom'

const activeLink = ({ isActive }) => (isActive ? "active" : "link");

const MobileBottombarItem = ({item}) => {
  return (
    <div className='mobile-view'>
      <NavLink to={item.path} className={activeLink}>
        <div className="flex flex-col items-center">
          {item.icon}
          <span className="mt-1">{item.title}</span> 
        </div>
      </NavLink>
    </div>
  )
}

export default MobileBottombarItem
