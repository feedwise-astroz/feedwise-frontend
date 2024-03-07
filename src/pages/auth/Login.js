import React, { useState } from 'react'
import "./auth.scss"
//import Card from "../../components/card/Card"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../service/authService'
import 'react-toastify/dist/ReactToastify.css';
import Card from '../../components/card/Card'
import FormLabel from '../../components/styled-components/FormLabel'
import FormInput from '../../components/styled-components/FormInput'
import FormButton from '../../components/styled-components/FormButton'


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
<div className="p-4 md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto h-screen flex items-center justify-center">  
<div className="w-full flex flex-col items-center justify-center">
<h2 className="text-2xl font-bold mb-1 text-center">Welcome</h2>
<p className="text-sm text-black-600 mb-8 text-center">Login to continue</p>
<Card>
     
          <form onSubmit={login} className="mb-4">
          <FormLabel>Email</FormLabel>
          <FormInput
            type="text"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleInputChange}
            className="my-custom-class"
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            type="password"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
            className="my-custom-class"
          />
          <FormButton type="submit">Log In</FormButton>
        </form>
          <div className="flex flex-col items-center gap-10">
            <Link to="/forgot" className="text-blue-500 mb-1 text-xs">Forgot Password?</Link>
            <span className="text-black-600">Create an Account - <Link to="/register" className="text-blue-500">Sign up</Link></span>
          </div>
        </Card>
         </div>
      
    </div>
  )
}

export default Login
