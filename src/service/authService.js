import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


export const validateEmail = (email) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}
// Register User
export const registerUser = async (userData) => {
  try {
    console.log(userData)
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData,
      { withCredentials: true }
    );

    if (response.status === '201') {
      toast.success("User Registered successfully");
    }
    console.log("this is response data")
    return response.data;

  } catch (error) {
    const errors = error.response.data.error; // Assuming errors is an array of error messages

    errors.forEach(errorMessage => {
      toast.error(errorMessage);
    });

  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    console.log(userData)
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData
    );
   
    if (response.statusText === "OK") {
      toast.success("Login Successful...");
    }
    console.log(response)
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/logout`);
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Forgot password
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/forgotpassword`,
      userData
    );
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Reset Password
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/users/resetpassword/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {

    const errors = error.response.data.error;
   
      toast.error(errors);

  }
};

// Get Login Status
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/loginStatus`);
    return response.data;

  } catch (error) {
    const errors = error.response.data.error;
  
      toast.error(errors);
   
  }
};