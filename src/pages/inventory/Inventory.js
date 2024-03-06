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
    <div>
      <Link to="/addfeed">Add New Feed Item</Link><br></br>
      <FeedList feeds={feeds} isLoading={isLoading}/>

    </div>
  )
}

export default Inventory
