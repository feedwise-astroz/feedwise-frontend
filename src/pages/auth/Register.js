import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../service/authService";

import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Card from "../../components/card/Card";
import FormLabel from "../../components/styled-components/FormLabel";
import FormInput from "../../components/styled-components/FormInput";
import FormButton from "../../components/styled-components/FormButton";
import CoverImage from "../../assets/homescreen-image/homescreen-cow-image.png";
import Logo from "../../assets/logo/green-logo.svg";
import './Login.scss'

const initialState = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [isLoading, setIsLoading] =useState(false)

  const [formData, setformData] = useState(initialState);
  const { fullname, email, password, confirmPassword } = formData;
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    setError(null);
  };

  const register = async (e) => {
    e.preventDefault();

    const userData = {
      fullname,
      email,
      password,
      confirmPassword,
    };

    // setIsLoading(true)
    try {
      //console.log(userData)
      const data = await registerUser(userData);

      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.fullname));
      navigate("/addcattle");
      // console.log(data)
      //   setIsLoading(false)
    } catch (error) {}
  };

  return (
    <div className="flex h-screen login-container">
      <div className="hidden md:block w-2/4">
        <img
          src={CoverImage}
          alt="Logo"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center w-full md:w-2/4">
        <div className="max-w-xl py-20 px-4 form-block">
        <img src={Logo} alt="Logo" className="absolute top-0 left-0 right-0 mx-auto mt-8 md:absolute md:top-0 md:right-0 md:mt-8 md:mr-8 md:h-12 md:w-auto" />
          <h2 className="form-heading mb-8">Create an Account</h2>
          {error && <div className="error-message">{error}</div>}
          <Card>
            <form onSubmit={register} className="mb-4">
              <FormLabel>Full name</FormLabel>
              <FormInput
                type="text"
                placeholder="Full name"
                required
                name="fullname"
                value={fullname}
                onChange={handleInputChange}
                className="my-custom-class"
              />
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
              <FormLabel>Confirm Password</FormLabel>
              <FormInput
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                className="my-custom-class"
              />
              <FormButton type="submit">Sign Up</FormButton>
            </form>
            <div className="flex flex-col items-center gap-10">
              <span>
                Already have an account? -{" "}
                <Link to="/login" className="text-primary-color">
                  Login
                </Link>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
