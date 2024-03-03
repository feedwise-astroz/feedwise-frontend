import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeed } from '../../redux/features/inventory/inventorySlice'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { useParams } from 'react-router-dom'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'


const FeedDetail = () => {

    useRedirectLoggedOutUser("/login");
       
    const {feedId} = useParams();
   
   
    const dispatch = useDispatch();
   


    const isLoggedIn= useSelector(selectIsLoggedIn)
    const {feed,isLoading,isError, message}= useSelector((state)=>state.feed)
    
    
    useEffect(()=>{
        if(isLoggedIn === true){
            dispatch(getFeed(feedId))
            
           
            
        }
        if(isError){
            console.log(message);
        }
    },[isLoggedIn, isError, message, dispatch, feedId])
   
    const feedDetail = feed ? feed.data : null;
  return (
    <div className='feed-detail'>
        <h3>Feed Detail</h3>
        {feedDetail && (
                <>
                    <p>{feedDetail.feedName}</p>
                    <p>{feedDetail.animalTypes.join(', ')}</p>
                    <p>{feedDetail.feedQuantity}</p>
                    <p>{feedDetail.startDate}</p>
                    <p>{feedDetail.vendorName}</p>
                    <p>{feedDetail.txnID}</p>
                </>
            )}
      
    </div>
  )
}

export default FeedDetail
