import React, { useState } from 'react'
import "./auth.scss"
//import Card from "../../components/card/Card"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../service/authService'
import 'react-toastify/dist/ReactToastify.css';


const initialState ={ 
  email: "",
  password: "",
}

const Login = () => {
 

  const dispatch =useDispatch()
const navigate =useNavigate()

  //const [isLoading, setIsLoading] =useState(false)


  const[formData, setformData]= useState(initialState)
  const{ email, password } = formData

  const handleInputChange = (e) => {
    const { name,value} = e.target;
    setformData({...formData, [name]: value});
};

const login= async (e) =>{
  e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
   // setIsLoading(true);
    try {
      //console.log(userData)
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.fullname));
      navigate("/dashboard");
     // setIsLoading(false);
    } catch (error) {
    //  setIsLoading(false);
    }

}

  return (
    <div >
  
         <div>
            <h2>Login</h2>
            <form onSubmit={login}>
                <label>Email</label><br></br>
                <input type="text" placeholder="Email" required name="email" value={email} onChange={handleInputChange}/><br></br>
                <label>Password</label><br></br>
                <input type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange}/><br></br>
                <button type="submit" className='primary'>Log In</button>
            </form>
              <Link to="/forgot">Forgot Password?</Link><br>
              </br>
              <span>
                <Link to="/register">Sign up</Link>
              </span>
              
         </div>
      
    </div>
  )
}

export default Login
