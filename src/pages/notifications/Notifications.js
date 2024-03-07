import React, { useEffect, useState } from 'react'
import notificationService from '../../redux/features/notifications/notificationService'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import PopUp from '../../components/popUp/PopUp'




const Notifications = () => {


    useRedirectLoggedOutUser("/login")

    const [notifications, setNotifications] = useState([])

    const [message,setMessage]=useState(null)
    const [popup, setPopup] = useState(false);

    useEffect(() => {

        async function getNotificatioData() {
            const notificationData = await notificationService.getNotifications();
       console.log(notificationData);
            setNotifications(notificationData.data)
        }
        getNotificatioData();
    }, []);

    const handleButtonClick = async (id) => {

        console.log(id);

        setPopup(!popup);
        const data1 = await notificationService.getNotification(id);
          console.log(data1);
       
        setMessage(data1.data)

    };
    

    const formatCreatedAt = (createdAt) => {
        const date = new Date(createdAt);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
      
    return (
        <div>
            <h3>Notifications</h3>

            {Array.isArray(notifications) &&
                notifications.map((n) => (
                    <div key={n._id}>
                        <p>{n.message}</p>
                        <p>{formatCreatedAt(n.createdAt)}</p>

                        <button className="btn btn-danger w-full" onClick={() => handleButtonClick(n._id)}>View Details</button>
                    </div>
                ))}

            <PopUp open={popup} onClose={() => setPopup(false)}>
                <div className="text-center w-56">
                    <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">Notification Detail</h3>
                        {message && <p className="text-sm font-black text-green-800">Feed Name: {message.feedName}</p>}
                        {message && <p className="text-sm font-black text-green-800">Quantity:  {message.feedQuantity}</p>}
                        {message && <p className="text-sm font-black text-green-800">Feed Status: {message.inStock}</p>}
                        {message && <p className="text-sm font-black text-green-800">Message Date: {formatCreatedAt(message.createdAt)}</p>}
                        {message && <p className="text-sm font-black text-green-800">{message.message}</p>}

                    
                    </div>

                </div>
            </PopUp>

        </div>
    )
}

export default Notifications
