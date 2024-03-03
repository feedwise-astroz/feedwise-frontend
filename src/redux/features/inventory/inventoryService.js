import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



// Create New Product
const createFeed = async (formData) => {
    console.log(formData)
  const response = await axios.post(`${BACKEND_URL}/api/feedInventory/addFeedData`, formData);
  return response.data;
};

// Get all products
const getFeeds = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/feedInventory/getFeedData/`);
  return response.data;
};

// Get a Feed
const getFeed = async (id) => {
  console.log(id)
  const response = await axios.get(`${BACKEND_URL}/api/feedInventory/getFeedData/` + id);
  console.log(response.data)
  return response.data;
};

const inventoryService = {
    createFeed,
    getFeeds,
    getFeed
   
  };
  
export default inventoryService;