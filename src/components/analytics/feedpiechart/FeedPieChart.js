import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import inventoryService from '../../../redux/features/inventory/inventoryService';



const FeedPieChart = () => { 

  const [activefeed, setActivefeed] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getAnalytics() {
      try {
        const Activedata = await inventoryService.getActiveFeed();
        setActivefeed(Activedata.data);

        const totalFeedQuantity = activefeed.reduce(
          (total, item) => total + item.feedQuantity,
          0
        );

        const newData = activefeed.map((item) => ({
          id: item.feedName,
          label: item.feedName,
          value: Math.round((item.feedQuantity / totalFeedQuantity) * 100),
        }));

        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getAnalytics();
  }, [activefeed]);





  return (
    <div style={{ height: '600px', width: '300px', position: 'relative' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Current Feed left</h2>
      
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'category10' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.9]] }}
        enableRadialLabels={false}
        enableSliceLabels={true}
        sliceLabel={({ slice }) => {
          const { value } = slice;
          return (
            <g>
              <circle fill="lightblue" r="15" />
              <text
                fontSize="12px"
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {value}
              </text>
            </g>
          );
        }}
        tooltip={({ id, value }) => <strong>{value}</strong>}
      />
    </div>
  );
};
export default FeedPieChart;