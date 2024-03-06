import React from 'react'
import './Sidebar.scss'
import Sidebaritem from './Sidebaritem'
import menu from "../../data/sidebar";



const Sidebar = ({ children }) => {

  return (
    <div className='layout'>
        <div className="sidebar">
           {menu.map((item, index)=>{
            return <Sidebaritem key={index} item={item}/>
           })}
        </div>
        <main>
            {children}
        </main>
      
    </div>
    
    
  )
}

export default Sidebar
