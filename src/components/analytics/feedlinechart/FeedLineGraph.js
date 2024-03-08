import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { MdFilterListAlt } from 'react-icons/md';
import inventoryService from '../../../redux/features/inventory/inventoryService';


const FeedLineGraph = () => {
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
        x: formatCreatedAtDate(item.purchaseDate),
        y: item.purchasePrice,
      }));
  
      const updatedData = [
        {
          id: 'TotalCost',
          data: formattedFilteredData,
        },
      ];
      setChartData(updatedData);
      console.log('Filtered Data:', updatedData);
    } else {
      // If no feedName is selected, show all data
      const formattedData = activedata.map((item) => ({
        x: formatCreatedAtDate(item.purchaseDate),
        y: item.purchasePrice,
      }));
  
      const updatedData = [
        {
          id: 'TotalCost',
          data: formattedData,
        },
      ];
      setChartData(updatedData);
  
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
    return date.toLocaleString('default', { month: 'short' });
  };

  return (
    <div style={{ height: '450px', position: 'relative' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Feed Used per Month</h2>
      <MdFilterListAlt onClick={handleFilterButtonClick} />

      {showDropdown && (
        <div style={{ position: 'absolute', top: '40px', left: '70px', zIndex: 1 }}>
         
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


      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Month',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Total Cost',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ theme: 'background' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default FeedLineGraph;
