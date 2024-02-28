import React, { useEffect } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'



const Dashboard = ({children}) => {
  useRedirectLoggedOutUser("/login");



  return (
    <div className='main-content'>
      Dashboard
      
    </div>
  )
}

export default Dashboard
