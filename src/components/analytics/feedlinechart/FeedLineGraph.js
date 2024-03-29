import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { MdFilterListAlt } from "react-icons/md";
import inventoryService from "../../../redux/features/inventory/inventoryService";
import './FeedLineGraph.scss'

const FeedLineGraph = () => {
  const [activedata, setActivedata] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [uniqueFeedNames, setUniqueFeedNames] = useState([]);
  const [selectedFeedName, setSelectedFeedName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const customColors = ["#0B3954"];

  useEffect(() => {
    async function getAnalytics() {
      try {
        const Activedata = await inventoryService.getFeeds();

        setActivedata(Activedata.data);

        const uniqueNames = [
          ...new Set(Activedata.data.map((item) => item.feedName)),
        ];
        setUniqueFeedNames(uniqueNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getAnalytics();
  }, []);

  useEffect(() => {
    if (selectedFeedName) {
        const groupedData = filteredData.reduce((acc, item) => {
            const purchaseMonth = formatCreatedAtDate(item.purchaseDate);
            if (!acc[purchaseMonth]) {
                acc[purchaseMonth] = 0;
            }
            acc[purchaseMonth] += item.purchasePrice;
            return acc;
        }, {});

        const formattedFilteredData = Object.entries(groupedData).map(([month, totalPrice]) => ({
            x: month,
            y: totalPrice,
        }));

        const updatedData = [{
            id: "TotalCost",
            data: formattedFilteredData,
        }];
        setChartData(updatedData);
    } else {
        const formattedData = activedata.map((item) => ({
            x: formatCreatedAtDate(item.purchaseDate),
            y: item.purchasePrice,
        }));

        const updatedData = [{
            id: "TotalCost",
            data: formattedData,
        }];
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
    const filtered = activedata.filter(
      (item) => item.feedName === selectedValue
    );
    setFilteredData(filtered);
    console.log(filtered)
  };

  const formatCreatedAtDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short" });
  };

  return (

    <div className="feedLineGraph-container mx-auto">
      <div className="flex justify-between mx-auto">

      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', fontSize: '22px' }}>Purchases History per month</h2>
        <div className="flex items-center justify-end mb-4">
          {showDropdown && (
            <div style={{ marginRight: "10px" }}>
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

      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: "middle",
          tickValues: [1000, 2000, 4000, 8000],

          // gridValues: [1000, 2000, 4000],
        }}
        colors={customColors}
        enablePoints={false}
        enableGridX={false}
        enableGridY={true} // Enable gridlines on Y-axis
        gridYValues={[1000, 2000, 4000, 8000]}
        // enableGridY={false}
        theme={{
          grid: {
            line: {
              stroke: "green", // Custom color for gridlines
              strokeWidth: 1, // Adjust thickness if needed
              strokeDasharray: "4 4", // Adjust dash pattern if needed
            },
          },
        }}
        useMesh={true}
      />
    </div>
  );
};

export default FeedLineGraph;
