import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


// Get All Notifications
const getNotifications = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/notifications/`);
    return response.data;
  };

  //Get a Notification
  const getNotification = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/notifications/:id`);
    return response.data;
  };

  //Get Notification Count
  const getNotificationCount = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/notifications/notificationsCount`);
    return response.data;
  };

  const notificationService = {
   getNotifications,
   getNotification,
   getNotificationCount
   
  };
  
export default notificationService;