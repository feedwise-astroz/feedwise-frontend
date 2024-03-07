import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../service/authService";

import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Card from "../../components/card/Card";
import FormLabel from "../../components/styled-components/FormLabel";
import FormInput from "../../components/styled-components/FormInput";
import FormButton from "../../components/styled-components/FormButton";

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
    } catch (error) {
      // setIsLoading(false)
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto h-screen flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Create an Account
        </h2>
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
              Already have an account -{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
