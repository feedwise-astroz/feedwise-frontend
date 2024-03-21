import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { getFeeds } from '../../redux/features/inventory/inventorySlice'
import FeedList from '../../components/feedlist/FeedList'
import Heading from '../../components/heading/Heading'
import Button1 from '../../components/button1/Button1'

const Inventory = () => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const { feeds, isLoading, isError, message } = useSelector((state) => state.feed)


    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getFeeds())

        }
        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch])


    return (
        <div className="p-4 md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto h-screen flex items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center">
                <Heading heading="heading custom-class">Inventory</Heading>
                <Button1 className="submitbtn">
                    <Link to="/addfeed" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" style={{ marginRight: '5px' }}>
                            <path d="M13.5 7H11.5V11H7.5V13H11.5V17H13.5V13H17.5V11H13.5V7ZM12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2ZM12.5 20C8.09 20 4.5 16.41 4.5 12C4.5 7.59 8.09 4 12.5 4C16.91 4 20.5 7.59 20.5 12C20.5 16.41 16.91 20 12.5 20Z" fill="white" />
                        </svg>
                        Add New Feed Item
                    </Link>
                </Button1>
                <FeedList feeds={feeds} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default Inventory
