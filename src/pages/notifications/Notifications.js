import React, { useEffect, useState } from 'react'
import notificationService from '../../redux/features/notifications/notificationService'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import PopUp from '../../components/popUp/PopUp'
import { IoMdClose } from "react-icons/io";



const Notifications = () => {


    useRedirectLoggedOutUser("/login")

    const [notifications, setNotifications] = useState([])
    const [popup, setPopup] = useState(false);

    useEffect(() => {

        async function getNotificatioData() {
            const notificationData = await notificationService.getNotifications();

            setNotifications(notificationData.data)
        }
        getNotificatioData();
    }, []);
    const handleButtonClick = (id) => {

        setPopup(!popup);

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
                        <button onClick={() => handleButtonClick(n._id)}>View Details</button>
                    </div>
                ))}

            <PopUp open={popup} onClose={() => setPopup(false)}>
                <div className="text-center w-56">
                    <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
                        <p className="text-sm font-black text-gray-800">
                            Are you sure you want to delete this item?
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="btn btn-danger w-full">Delete</button>
                        <button
                            className="btn btn-light w-full"
                            onClick={() => setPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </PopUp>

        </div>
    )
}

export default Notifications
