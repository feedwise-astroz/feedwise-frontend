import React, { useState } from 'react'
//import styles from "./auth.scss"
import { Link, useNavigate } from 'react-router-dom'
//import {toast} from 'react-toastify'
//import { validateEmail } from '../../service/authService'
import { registerUser } from '../../service/authService'

import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'


const initialState ={
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const Register = () => {
const dispatch =useDispatch()
const navigate =useNavigate()

 // const [isLoading, setIsLoading] =useState(false)


  const[formData, setformData]= useState(initialState)
  const{ fullname, email, password, confirmPassword} = formData
  const [error, setError] = useState(null);

   const handleInputChange = (e) =>{
        const {name,value}= e.target;
        setformData({...formData, [name]: value})
        setError(null);
   }

   const register = async (e) =>{
   
    e.preventDefault();
   
   
    
    const userData={
      fullname, email, password,confirmPassword
    };
    
   // setIsLoading(true)
    try{
      //console.log(userData)
      const data =await registerUser(userData);
      
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.fullname))
      navigate("/addcattle")
     // console.log(data)
   //   setIsLoading(false)
      
     
    }catch(error){
     // setIsLoading(false)
       console.log(error)
    }

   }
  
  

  return (
    <div>
      
         <div>
            <h2>Registration</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={register}>
                <label>Full name</label><br></br>
                <input type="text" placeholder="name" required name='fullname' value={fullname} onChange={handleInputChange}/><br></br>
                <label>Email</label><br></br>
                <input type="text" placeholder="Email" required name='email' value={email} onChange={handleInputChange}/><br></br>
                <label>Password</label><br></br>
                <input type="password" placeholder="Password" required name='password' value={password} onChange={handleInputChange}/><br></br>
                <label>Confirm Password</label><br></br>
                <input type="password" placeholder="Confirm Password" required name='confirmPassword' value={confirmPassword} onChange={handleInputChange}/><br></br>
                <button type="submit" className='primary'>Sign Up</button>
            </form>
              <span>
                <Link to="/login">Login</Link>
              </span>
              </div>
      
    </div>
  )
   
  }


export default Register