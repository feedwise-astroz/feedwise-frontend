import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeed } from '../../redux/features/inventory/inventorySlice'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { Link, useParams } from 'react-router-dom'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { RadialBar } from "@nivo/radial-bar";

const FeedDetail = () => {

  useRedirectLoggedOutUser("/login");

  const { feedId } = useParams();

  //const [remainfeed,setRemainfeed] =useState('')
  //const [myvalue,setMyvalue]=useState('')

  const color = "green";
  
  



  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad with leading zero if necessary
    const day = date.getDate().toString().padStart(2, '0'); // Pad with leading zero if necessary
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };



  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { feed, isError, message } = useSelector((state) => state.feed)
 let myvalue=""

  useEffect(() => {


    if (isLoggedIn === true) {
      dispatch(getFeed(feedId))



    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, feedId])
  

  const feedDetail = feed ? feed.data : null;
   
 
 
 
 if (feedDetail) {
  myvalue = ((feedDetail.remainingFeedQuantity / feedDetail.feedQuantity) * 100).toFixed(1);
}
  
  const Metric = ({ center }) => {
    return (

      <text
        x={center[0]}
        y={center[1]}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 21,
          fill: color
        }}
      >
        <tspan x={center[0]} dy="-1.2em" fontSize="21" fill={color}>
          Item Left
        </tspan>
        <tspan x={center[0]} dy="1.5em" display="block"> 
          {myvalue}%
        </tspan>

      </text>
    );
  };



  return (


    <div className='feed-detail'>
      <Link to="/inventory">Back</Link><br></br>
      <Link to={`/editFeed/${feedId}`}>Edit</Link>
      <h3>Feed Detail</h3>
      {feedDetail && (
        <>
          <p>{feedDetail.feedName}</p>
          <p>{feedDetail.animalTypes.join(', ')}</p>
          <p>{feedDetail.feedQuantity}</p>
          <p>{formatDate(feedDetail.startDate)}</p>
          <p>{feedDetail.vendorName}</p>
          <p>{feedDetail.txnID}</p>
          <p>{feedDetail.remainingFeedQuantity}</p>

        </>
      )}
   
      <div className="App">
      
        <RadialBar
          width={220}
          height={220}
          valueFormat={(v) => `${v}%`}
          maxValue={100}
          startAngle={-160}
          endAngle={160}
          cornerRadius={100}
          innerRadius={0.7}
          colors={[color]}
          data={[
            {
              id: "default",
              data: [{ x: "percentage", y: myvalue }]
            }
          ]}
          layers={["tracks", "bars", Metric]}
        />
      </div>



    </div>
  )
}

export default FeedDetail
