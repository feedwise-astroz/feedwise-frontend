import React from 'react'
import { NavLink } from 'react-router-dom'

const activeLink = ({ isActive }) => (isActive ? "active" : "link");

const Sidebaritem = ({item}) => {
  return (
    <div>

        <NavLink to={item.path} className={activeLink}>{item.title}</NavLink>
      
    </div>
  )
}

export default Sidebaritem
