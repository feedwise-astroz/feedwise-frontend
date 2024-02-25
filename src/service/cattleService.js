import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


export const addCattleDetails = async (userData) => {
    try {
      console.log(userData)
      const response = await axios.post(
        `${BACKEND_URL}/api/users/addcattle`,
        userData
      );
      console.log(response)
      if (response.success === "true") {
        toast.success("Cattle Detials Added Successfully...");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };