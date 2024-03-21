import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { MdFilterListAlt } from 'react-icons/md';
import inventoryService from '../../../redux/features/inventory/inventoryService';


const FeedBarGraph = () => {
  const [activedata, setActivedata] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [uniqueFeedNames, setUniqueFeedNames] = useState([]);
  const [selectedFeedName, setSelectedFeedName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState([]);

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
    // Filter data based on selected feedName
    if (selectedFeedName) {
      const formattedFilteredData = filteredData.map((item) => ({
        month: formatCreatedAtDate(item.purchaseDate),
        feedUsed: item.feedQuantity,
      }));

      // Remove the array wrapping here
      setChartData(formattedFilteredData);
      console.log('Filtered Data:', formattedFilteredData);
    } else {
      // If no feedName is selected, show all data
      const formattedData = activedata.map((item) => ({
        month: formatCreatedAtDate(item.purchaseDate),
        feedUsed: item.feedQuantity,
      }));

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
    <div style={{ height: '450px', position: 'relative' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Feed Used per Month</h2>
      <MdFilterListAlt onClick={handleFilterButtonClick} />

      {showDropdown && (
        <div style={{ position: 'absolute', top: '40px', left: '70px', zIndex: 1 }}>
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

      <div style={{ width: '420px', height: '203px' }}>
        <ResponsiveBar
          data={chartData}
          keys={['feedUsed']}
          indexBy="month"
          margin={{ top: 30, right: 30, bottom: 50, left: 50 }} // Adjusted margin
          padding={0.2} // Adjusted padding
          colors={{ scheme: 'nivo' }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickValues: [0,1200,2200], // Specify the tick values for y-axis
            legend: 'Feed Used',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
            },
          ]}
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
    </div>
  );
};

export default FeedBarGraph;

