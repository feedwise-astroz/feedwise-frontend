// Import necessary packages
import React from 'react';
import { ResponsiveLine } from '@nivo/line';

// Sample data
const data = [
  {
    id: 'TotalCost',
    data: [
        { x: 'Jan', y: 1000 },
        { x: 'Feb', y: 1200 },
        { x: 'Mar', y: 800 },
        { x: 'Apr', y: 1500 },
        { x: 'May', y: 1100 },
        { x: 'Jun', y: 900 },
        { x: 'Jul', y: 1300 },
        { x: 'Aug', y: 1000 },
        { x: 'Sep', y: 1200 },
        { x: 'Oct', y: 800 },
        { x: 'Nov', y: 1500 },
        { x: 'Dec', y: 1100 },
    ],
  },
];

// Define the LineChart component
const FeedLineGraph = () => (
  <div style={{ height: '400px' }}>
    <ResponsiveLine
      data={data}
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

export default FeedLineGraph;
