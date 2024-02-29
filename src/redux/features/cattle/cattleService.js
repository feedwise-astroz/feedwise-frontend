import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const API_URL=`${BACKEND_URL}/api/cattle/addCattle`

//create New Cattle

export const createCattle= async(FormData) =>{

    const response =await axios.post(API_URL, FormData)
    console.log(response.data)
    return response.data


};

const cattleService ={
    createCattle
}

export default cattleService;