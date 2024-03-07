import React, { useEffect } from 'react'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { getFeeds } from '../../redux/features/inventory/inventorySlice'
import FeedList from '../../components/feedlist/FeedList'
const Inventory = () => {
    const dispatch=useDispatch()

    const isLoggedIn=useSelector(selectIsLoggedIn)
    const {feeds,isLoading,isError, message}=useSelector((state)=>state.feed)


    useEffect(()=>{
        if(isLoggedIn === true){
            dispatch(getFeeds())
            
        }
        if(isError){
            console.log(message);
        }
    },[isLoggedIn, isError, message, dispatch])

    
  return (
    <div className="p-4 md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto h-screen flex items-center justify-center">
    <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2 text-center">Inventory System</h2>
        <p className="text-sm text-black-600 mb-6 text-center">A table Summary of all the feed item that you have added into your Inventory log</p>
        <Link to="/addfeed" className="text-blue-500 mb-4 block">Add New Feed Item</Link>
        <FeedList feeds={feeds} isLoading={isLoading} />
    </div>
</div>
  )
}

export default Inventory
