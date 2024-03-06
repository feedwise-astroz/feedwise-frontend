import React from 'react';

const FeedList = ({ feeds, isLoading }) => {

  const feedData=feeds.data

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad with leading zero if necessary
    const day = date.getDate().toString().padStart(2, '0'); // Pad with leading zero if necessary
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
   
    const handleRowClick = (feedId) => {
    
      window.location.href = `/getFeedData/${feedId}`;
    };
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
                  <tr key={feed._id} onClick={() => handleRowClick(feed._id)}>
                    <td>{feed.status}</td>
                    <td>{feed.feedName}</td>
                    <td>{feed.feedQuantity}</td>
                    <td>{formatDate(feed.startDate)}</td>
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