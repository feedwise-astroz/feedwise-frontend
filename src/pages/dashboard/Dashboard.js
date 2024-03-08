import React from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import FeedPieChart from '../../components/analytics/feedpiechart/FeedPieChart';
import FeedBarGraph from '../../components/analytics/feedbarchart/FeedBarGraph';
import FeedLineGraph from '../../components/analytics/feedlinechart/FeedLineGraph';





const Dashboard = ({ children }) => {
  useRedirectLoggedOutUser("/login");


  
  

  const purchaseData = [
    { month: 'Jan', purchases: 10 },
    { month: 'Feb', purchases: 15 },
    // Add more months and purchase data
  ];

  return (
    <div>
      <h1>Feed Quantity Pie Chart</h1>
      <FeedPieChart />
      <FeedBarGraph/>

      
      <FeedLineGraph data={purchaseData} />
    </div>
  );

}

export default Dashboard
