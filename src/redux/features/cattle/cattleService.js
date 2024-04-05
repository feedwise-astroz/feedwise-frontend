import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const API_URL=`${BACKEND_URL}/api/cattle/addCattle`

//create New Cattle

export const createCattle= async(FormData) =>{
  
    const response =await axios.post(API_URL, FormData)
    
    return response.data


};

//GET CATTLE DETAILS
export const getCattles = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/cattle/getCattleData`);

      //console.log(response.data)
      return response.data;
    } catch (error) {
      
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

  export const updateCattles = async (formData) => {

    const response = await axios.patch(`${BACKEND_URL}/api/cattle/updateCattle`, formData);
    console.log(response.data)
    return response.data;
  };

const cattleService ={
    createCattle,getCattles,updateCattles
}

export default cattleService;