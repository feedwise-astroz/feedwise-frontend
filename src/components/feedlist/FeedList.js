import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FeedList = ({ feeds, isLoading }) => {
 /*  console.log(feeds);
  console.log('Redux State:', useSelector((state) => state.feed));
  console.log("This is feeds data");
  console.log(feeds.data); */
  const feedData=feeds.data

  return (
    <div className='feed-list'>
      <h3>Products</h3>
      <div>
        {!isLoading && (!feeds || feeds.length === 0) ? (
          <p>No products found, please add a product...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Feeds</th>
                <th>Quantity</th>
                <th>Start Date</th>
                <th>In Stock</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(feedData) &&
                feedData.map((feed) => ( 
                  <tr key={feed._id}>
                    <td><Link to={`/getFeedData/${feed._id}`}>{feed.status}</Link></td>
                    <td>{feed.feedName}</td>
                    <td>{feed.feedQuantity}</td>
                    <td>{feed.startDate}</td>
                    <td>{feed.inStock}</td>
                  </tr>
                 
                ))}
                  

            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FeedList;
