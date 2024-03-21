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
<div className="feed-list">
  <div className="bg-white shadow-md rounded-lg overflow-hidden py-4">
  {!isLoading && (!feedData || feedData.length === 0) ? (
      <div className="p-4">
        <p className="text-gray-600">No products found, please add a product...</p>
      </div>
    ) : (
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Feeds</th>
            <th className="hidden lg:table-cell px-4 py-2">Quantity</th>
            {/* Hidden on mobile */}
            <th className="hidden lg:table-cell px-4 py-2">Start Date</th>
            {/* Hidden on mobile */}
            <th className="px-4 py-2">In Stock</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(feedData) &&
            feedData.map((feed) => (
              <tr key={feed._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(feed._id)}>
                <td className="border-b border-gray-200 px-4 py-2">
                  {feed.status === "Newly Active" || feed.status === "Active" ? (
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  ) : (
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  )}
                  {feed.status.charAt(0).toUpperCase() + feed.status.slice(1)}
                </td>
                <td className="border-b border-gray-200 px-4 py-2">{feed.feedName}</td>
                <td className="hidden lg:table-cell border-b border-gray-200 px-4 py-2">{feed.feedQuantity}</td>
                
                <td className="hidden lg:table-cell border-b border-gray-200 px-4 py-2">{formatDate(feed.startDate)}</td>
                
                <td className={`border-b border-gray-200 px-4 py-2 ${feed.inStock === 'High' ? 'text-green-500' : feed.inStock === 'Low' ? 'text-red-500' : ''}`}>{feed.inStock}</td>
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