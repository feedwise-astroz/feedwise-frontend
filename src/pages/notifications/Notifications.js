import React, { useEffect, useState } from 'react'
import notificationService from '../../redux/features/notifications/notificationService'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import PopUp from '../../components/popUp/PopUp'
import Card from '../../components/card/Card'
import './Notifications.scss'
import Heading from '../../components/heading/Heading'



const Notifications = () => {


    useRedirectLoggedOutUser("/login")

    const [notifications, setNotifications] = useState([])

    const [message, setMessage] = useState(null)
    const [popup, setPopup] = useState(false);

    useEffect(() => {

        async function getNotificatioData() {
            const notificationData = await notificationService.getNotifications();
            //  console.log(notificationData);
            setNotifications(notificationData.data)
        }
        getNotificatioData();
    }, []);

    const handleButtonClick = async (id) => {

        console.log(id);

        setPopup(!popup);
        const data1 = await notificationService.getNotification(id);
        //  console.log(data1);

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
            <Heading heading="heading custom-class">Notifications</Heading>

            {Array.isArray(notifications) &&
                notifications.map((n) => (

                    <Card cardClass={`card card-with-padding ${n.notificationType === 'Warning' ? 'red-border' : 'green-border'}`}>
                        <div className="notification-content">
                            <h3 style={{ display: 'flex', alignItems: 'center' }} className='head'>
                                {n.notificationType === 'Warning' && (
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: '5px' }}>
                                            <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#770918" />
                                        </svg>
                                        {n.notificationType}
                                    </span>
                                )}
                                {n.notificationType !== 'Warning' && (
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: '5px' }}>
                                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" fill="#43A047" />
                                        </svg>
                                        {n.notificationType}
                                    </span>
                                )}
                            </h3>


                            <p className='msg'>{n.message}</p>
                        </div>
                        <div className="notification-actions">
                            <p className="createdAt">{formatCreatedAt(n.createdAt)}</p>
                            <div className="action-button-container">
                                <button className="btn btn-details" onClick={() => handleButtonClick(n._id)}>View Details</button>
                            </div>
                        </div>
                    </Card>
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
