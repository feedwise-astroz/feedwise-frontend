import React from 'react'
import { NavLink } from 'react-router-dom'

const activeLink = ({ isActive }) => (isActive ? "active" : "link");

const MobileBottombarItem = ({item}) => {
    console.log("inside item barr")
    console.log(item)
  return (
    <div>

        <NavLink to={item.path} className={activeLink}>{item.icon}</NavLink>
      
    </div>
  )
}

export default MobileBottombarItem
