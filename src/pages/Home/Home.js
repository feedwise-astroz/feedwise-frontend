import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
       <Link to="/register">Register</Link>

        <button className="primary">
        <Link to="/dashboard">Login</Link>
        </button>
       
    </div>
  )
}

export default Home
