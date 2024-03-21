import React from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import FeedPieChart from '../../components/analytics/feedpiechart/FeedPieChart';
import FeedBarGraph from '../../components/analytics/feedbarchart/FeedBarGraph';
import FeedLineGraph from '../../components/analytics/feedlinechart/FeedLineGraph';
import Card from '../../components/card/Card';
import './Dashboard.scss'
import Heading from '../../components/heading/Heading';





const Dashboard = ({ children }) => {
  useRedirectLoggedOutUser("/login");






  return (
    <div>
      <Heading heading="heading custom-class">Dashboard</Heading>
      <div className='card-container'>
        <div>
          <Card cardClass="card piechart">
            <FeedPieChart />
          </Card>
        </div>
        <div>
          <Card cardClass="card linegraph">
            <FeedLineGraph />
          </Card>
          <Card cardClass="card barchart">
            <FeedBarGraph />
          </Card>
        </div>
      </div>
    </div>
  );

}

export default Dashboard
