import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeed } from '../../redux/features/inventory/inventorySlice'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { Link, useParams } from 'react-router-dom'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { RadialBar } from "@nivo/radial-bar";
import Button1 from '../button1/Button1';
import Button2 from '../button2/Button2';
import Heading from '../heading/Heading';
import Card from '../card/Card';
import './FeedDetail.scss'


const FeedDetail = () => {

  useRedirectLoggedOutUser("/login");

  const { feedId } = useParams();


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
  let myvalue = ""

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
      <Heading heading="heading custom-class">Feed Item detail</Heading>
      <div className='buttons'>
        <Button2 className="btn2"><Link to="/inventory">Back</Link></Button2>
        <Button1 className="submitbtn"><Link to={`/editFeed/${feedId}`}>Edit</Link></Button1>
      </div>
      <div className='feedDetails-card'>
        <Card cardClass="card">
          <div className="feedCard">
            {feedDetail && (
              <>

                <p> {feedDetail.status === "Newly Active" || feedDetail.status === "Active" ? (
                  <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                ) : (
                  <span className="inline-block w-4 h-4 rounded-full bg-red-500 mr-2"></span>
                )}
                  {feedDetail.status.charAt(0).toUpperCase() + feedDetail.status.slice(1)}</p>
                <div className='feed-split'> 
                <div className='feed-right'>
                  <p>Feed Name: {feedDetail.feedName}</p>
                  <p>Cattle to be feed: {feedDetail.animalTypes.join(', ')}</p>
                  <p>Quantity of feed: {feedDetail.feedQuantity}</p>
                  <p>Start Date: {formatDate(feedDetail.startDate)}</p>
                </div>
                <div className='feed-left'>
                  <p>VendorName: {feedDetail.vendorName}</p>
                  <p>Purchase price: {feedDetail.purchasePrice}</p>
                  <p>Purchase Date: {formatDate(feedDetail.purchaseDate)}</p>
                  <p>Transaction Id: {feedDetail.txnID}</p>
                </div>
                </div> 


              </>
            )}

          </div>
        </Card>

        <Card cardClass="card feedDetail-card">
          <div className="meter">

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

        </Card>
      </div>
    </div>
  )
}

export default FeedDetail
