import React, { useState } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import FeedPieChart from "../../components/analytics/feedpiechart/FeedPieChart";
import FeedBarGraph from "../../components/analytics/feedbarchart/FeedBarGraph";
import FeedLineGraph from "../../components/analytics/feedlinechart/FeedLineGraph";
import Card from "../../components/card/Card";
import "./Dashboard.scss";
import Heading from "../../components/heading/Heading";
import Button3 from "../../components/button3/Button3";
import { Link } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';

const Dashboard = ({ children }) => {
  useRedirectLoggedOutUser("/login");
  const [activeData, setActiveData] = useState([]);
  const [customColors, setCustomColors] = useState([]);

  return (
    <div>
      <Heading heading="heading custom-class">Dashboard</Heading>
      <div>
        <Button3 className="submitbtn3">
          <Link
            to="/addfeed"
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <FaPlus className="plus-icon" />
           <span className="button-text ml-2">Add New Feed Item</span>
           
          </Link>
        </Button3>
      </div>
      <div className="dashboard-container border">
        <div className="graph-left-column">
          <Card>
            <FeedPieChart
              setActiveData={setActiveData}
              setCustomColors={setCustomColors}
            />
            <p className="total-feed-left-heading">Total Feed Left</p>
            {activeData.map((item, index) => (
              <div key={index} className="piechart-feed-list">
                <div className="piechart-feed-details">
                  <div
                    className="color-circle"
                    style={{ backgroundColor: customColors[index] }}
                  ></div>
                  <p>{item.feedName}</p>
                </div>
                <div>
                  <p>{item.feedQuantity}kgs</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
        <div className="graph-right-column">
          <div className="graph-container">
            <Card>
              <FeedLineGraph />
            </Card>
          </div>
          <div className="graph-container">
            <Card>
              <FeedBarGraph />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
