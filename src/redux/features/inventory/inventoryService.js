import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



// Create New Product
const createFeed = async (formData) => {
    console.log(formData)
  const response = await axios.post(`${BACKEND_URL}/api/feedInventory/addFeedData`, formData);
  console.log("Newly Added Feed Details");
  console.log(response)
  return response.data;
};

// Get all products
const getFeeds = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/feedInventory/getFeedData/`);
  return response.data;
};

// Get a Feed
const getFeed = async (id) => {
 
  const response = await axios.get(`${BACKEND_URL}/api/feedInventory/getFeedData/` + id);

  return response.data;
};

// update the feed
const updateFeed = async (id, formData) => {

  const response = await axios.patch(`${BACKEND_URL}/api/feedInventory/updateFeedData/`+id, formData);
  
  return response.data;
};


//get Active feed data

const getActiveFeed = async () =>{

  const response = await axios.get(`${BACKEND_URL}/api/feedInventory/getActiveFeedData/`);
  
  return response.data;
};

const inventoryService = {
    createFeed,
    getFeeds,
    getFeed,
    updateFeed,getActiveFeed
   
  };
  
export default inventoryService;