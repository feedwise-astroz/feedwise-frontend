import React from 'react';
import { ResponsivePie } from '@nivo/pie';
const FeedPieChart = ({ data }) => {
  return (
    <div style={{ height: '400px', position: 'relative' }}>
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