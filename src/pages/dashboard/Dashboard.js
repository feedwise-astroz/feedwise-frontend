import React from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import Sidebar from '../../components/sidebar/Sidebar';
import Layout from '../../components/layout/Layout';



const Dashboard = ({ children }) => {
  useRedirectLoggedOutUser("/login");

  
  return (
    <Sidebar>
      <Layout>
        <div className='main-content'>
          Dashboard

        </div>
      </Layout>
    </Sidebar>


  )
}

export default Dashboard
