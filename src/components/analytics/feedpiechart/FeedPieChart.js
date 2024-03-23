import React, { useEffect, useMemo, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import inventoryService from "../../../redux/features/inventory/inventoryService";
import "./pie.scss";

const FeedPieChart = ({setActiveData, setCustomColors}) => {
  const [activefeed, setActivefeed] = useState([]);
  const [data, setData] = useState([]);
  // Memoize customColors array
  const customColors = useMemo(() => [
    "#FFC857",
    "#177E89",
    "#3D9970",
    "#6495ED",
    "#008080",
    "#40E0D0",
    "#228B22",
    "#00FF7F",
    "#B0E0E6",
    "#FFA500",
    "#FA8072",
    "#FFA07A",
  ], []);
  useEffect(() => {
    async function getAnalytics() {
      try {
        const Activedata = await inventoryService.getActiveFeed();
        setActivefeed(Activedata.data);

        const totalFeedQuantity = activefeed.reduce(
          (total, item) => total + item.feedQuantity,
          0
        );

        const newData = activefeed.map((item, index) => ({
          id: item.feedName,
          label: item.feedName,
          value: Math.round((item.feedQuantity / totalFeedQuantity) * 100),
          color: customColors[index % customColors.length],
        }));

        setData(newData);
        setActiveData(Activedata.data); 
        setCustomColors(customColors); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getAnalytics();
  },  [activefeed, setActiveData, setCustomColors, customColors]);

  return (
    <div className="pie-container">
      <h2 className="text-left mb-5 font-bold">Current Feed left</h2>
      

      <ResponsivePie className="piepie"
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        // cornerRadius={0}
        colors={customColors}
        enableRadialLabels={false}
        enableSliceLabels={true}
        sliceLabel={({ slice }) => {
          const { value } = slice;
          return (
            <g>
              <circle fill="lightblue" r="15" />
              <text
                fontSize="122px"
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
