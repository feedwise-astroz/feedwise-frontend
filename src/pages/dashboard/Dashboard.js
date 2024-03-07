import React from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import FeedPieChart from '../../components/analytics/feedpiechart/FeedPieChart';
import FeedBarGraph from '../../components/analytics/feedbarchart/FeedBarGraph';
import FeedLineGraph from '../../components/analytics/feedlinechart/FeedLineGraph';





const Dashboard = ({ children }) => {
  useRedirectLoggedOutUser("/login");


  
  const data = [
    {
      id: 'Grass 2',
      label: 'Grass 2',
      value: 37,
    },
    {
      id: 'grass',
      label: 'grass',
      value: 3,
    },
    {
      id: 'karthik',
      label: 'grass edjnd',
      value: 20,
    },
    {
      id: 'sandeep',
      label: 'grass sdkjnks',
      value: 40,
    },
  ];

  const purchaseData = [
    { month: 'Jan', purchases: 10 },
    { month: 'Feb', purchases: 15 },
    // Add more months and purchase data
  ];

  return (
    <div>
      <h1>Feed Quantity Pie Chart</h1>
      <FeedPieChart data={data} />
      <FeedBarGraph/>

      <h1>Purchase History</h1>
      <FeedLineGraph data={purchaseData} />
    </div>
  );

}

export default Dashboard
