import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../service/authService";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/card/Card";
import FormLabel from "../../components/styled-components/FormLabel";
import FormInput from "../../components/styled-components/FormInput";
import FormButton from "../../components/styled-components/FormButton";
import CoverImage from "../../assets/homescreen-image/homescreen-cow-image.png";
import Logo from "../../assets/logo/green-logo.svg";
import "./Login.scss";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
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

    try {
      const data = await loginUser(userData);
      console.log("this is data")
      console.log(data)
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.fullname));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
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
          <img
            src={Logo}
            alt="Logo"
            className="absolute top-0 left-0 right-0 mx-auto mt-8 md:absolute md:top-0 md:right-0 md:mt-8 md:mr-8 md:h-12 md:w-auto"
          />
          <h2 className="form-heading">Welcome</h2>
          <p className="form-subheading">Login to continue</p>
          <Card>
            <div className="formContainer">
              <form
                onSubmit={login}
                className="mt-8 md:ml-8 md:mr-8 lg:ml-8 lg:mr-8"
              >
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="text"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
                <FormButton type="submit">Log In</FormButton>
              </form>
            </div>
            <div className="flex flex-col items-center gap-10">
              <Link
                to="/forgot"
                className="text-secondary-color mb-1 mt-2 md:mt-8 text-s"
              >
                Forgot Password?
              </Link>
              <span className="text-black-600 mb-6">
                Create an Account -{" "}
                <Link to="/register" className="text-primary-color">
                  Sign up
                </Link>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
