import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const data = [
  { month: 'January', feedUsed: 100 },
  { month: 'February', feedUsed: 150 },
  { month: 'March', feedUsed: 120 },
  // Add more months and feed used data as needed
];

const FeedBarGraph = () => (
  <div style={{ height: '400px' }}>
    <ResponsiveBar
      data={data}
      keys={['feedUsed']}
      indexBy="month"
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      padding={0.3}
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
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
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
    />
  </div>
);

export default FeedBarGraph;
