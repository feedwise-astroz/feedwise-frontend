import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { MdFilterListAlt } from 'react-icons/md';
import inventoryService from '../../../redux/features/inventory/inventoryService';
import './FeedBarGraph.scss'


const FeedBarGraph = () => {
  const [activedata, setActivedata] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [uniqueFeedNames, setUniqueFeedNames] = useState([]);
  const [selectedFeedName, setSelectedFeedName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const customColors = ["#177E89"];

  useEffect(() => {
    async function getAnalytics() {
      try {
        const Activedata = await inventoryService.getFeeds();

        setActivedata(Activedata.data);

        // Extract unique feedName values
        const uniqueNames = [...new Set(Activedata.data.map(item => item.feedName))];
        setUniqueFeedNames(uniqueNames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getAnalytics();
  }, []);

  useEffect(() => {
    // Function to sum up feedQuantity values for the same month
    const sumFeedQuantities = (data) => {
      const aggregatedData = data.reduce((acc, item) => {
        const month = formatCreatedAtDate(item.purchaseDate);
        const existingItem = acc.find(data => data.month === month);
  
        if (existingItem) {
          existingItem.feedUsed += item.feedQuantity;
        } else {
          acc.push({
            month: month,
            feedUsed: item.feedQuantity
          });
        }
  
        return acc;
      }, []);
      return aggregatedData;
    };
  
    // Filter data based on selected feedName
    if (selectedFeedName) {
      const formattedFilteredData = sumFeedQuantities(filteredData);
      setChartData(formattedFilteredData);
    } else {
      // If no feedName is selected, show all data
      const formattedData = sumFeedQuantities(activedata);
      setChartData(formattedData);
    }
  }, [selectedFeedName, activedata, filteredData]);
  


  const handleFilterButtonClick = () => {
    // Toggle the visibility of the dropdown
    setShowDropdown((prev) => !prev);
  };

  const handleDropdownSelect = (selectedValue) => {
    // Update the selected feedName
    setSelectedFeedName(selectedValue);

    // Filter data based on the selected feedName
    const filtered = activedata.filter((item) => item.feedName === selectedValue);
    setFilteredData(filtered);
  };

  const formatCreatedAtDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
  };

  return (

    <div className="feedBarGraph-container mx-auto">
            <div className="flex justify-between mx-auto">
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', fontSize: '22px' }}>Feed Used per Month</h2>
            <div className="flex items-center justify-end mb-4">
            {showDropdown && (
                 <div style={{ marginRight: "10px" }}>
          {/* Adjusted the left property to add space */}
          <select onChange={(e) => handleDropdownSelect(e.target.value)}>
            <option value="">Select Feed Name</option>
            {uniqueFeedNames.map((feedName) => (
              <option key={feedName} value={feedName}>
                {feedName}
              </option>
            ))}
          </select>
        </div>
      )}
      <MdFilterListAlt onClick={handleFilterButtonClick} />
      </div>
      </div>



        <ResponsiveBar
          data={chartData}
          keys={['feedUsed']}
          indexBy="month"
          margin={{ top: 30, right: 30, bottom: 50, left: 50 }} // Adjusted margin
          padding='0.4'
          colors={customColors}
          borderRadius='6px'
          enableLabel={true}
          totalFormat={(value) => `${value} `} 
          enableTotals={true}
          totalsOffset='9px'
          enableGridY={false}
          enableGridX={false}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 10 // Adjusted font size for axis ticks
                }
              }
            }
          }}
        />

    </div>
  );
};

export default FeedBarGraph;

