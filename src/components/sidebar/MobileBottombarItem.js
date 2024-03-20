import React from 'react'
import { NavLink } from 'react-router-dom'

const activeLink = ({ isActive }) => (isActive ? "active" : "link");

const MobileBottombarItem = ({item}) => {
  return (
    <div className='mobile-view'>
        <NavLink to={item.path} className={activeLink}>{item.icon}</NavLink>
    </div>
  )
}

export default MobileBottombarItem
