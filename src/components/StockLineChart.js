import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { initialData } from "../data/StockData"; // Importing stock data
import { Scrollbars } from "react-custom-scrollbars-2";
import { fin } from "@openfin/core";

const StockLineChart = ({ isDarkMode, chartData }) => {
  // Prepare data grouped by ticker for the line chart
  // const groupedData = initialData.reduce((acc, stock) => {
  //   const tickerGroup = acc.find((group) => group.id === stock.ticker);
  //   if (tickerGroup) {
  //     tickerGroup.data.push({ x: stock.date, y: stock.price });
  //   } else {
  //     acc.push({
  //       id: stock.ticker,
  //       data: [{ x: stock.date, y: stock.price }],
  //     });
  //   }
  //   return acc;
  // }, []);

  return (
    <div style={{ height: 400 }}>
      <Scrollbars style={{ height: "100%" }}>
        <ResponsiveLine
          data={chartData}
          margin={{ top: 40, right: 60, bottom: 60, left: 80 }} // Increase margin for labels
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Date",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Price",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          enablePointLabel={true}
          pointLabel="y"
          pointLabelYOffset={-12}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          enableArea={true}
          areaOpacity={0.1}
          useMesh={true}
          // colors={{ scheme: "set1" }} // Use a color scheme from nivo
          colors={[
            "#4bad93",
            "#33FF57",
            "#3357FF",
            "#F1C40F",
            "#9B59B6",
            "#2ECC71",
          ]} // Multiple colors
          theme={{
            background: isDarkMode ? "#060b28f0" : "#f2f0f0",
            axis: {
              domain: {
                line: {
                  stroke: isDarkMode ? "#fff" : "#000",
                  strokeWidth: 1,
                },
              },
              ticks: {
                line: {
                  stroke: isDarkMode ? "#fff" : "#000",
                  strokeWidth: 1,
                },
                text: {
                  fill: isDarkMode ? "#fff" : "#000",
                  fontSize: 12, // Reduced font size for axis labels and ticks
                },
              },
            },
            grid: {
              line: {
                stroke: isDarkMode ? "#555" : "#ccc",
                strokeWidth: 1,
              },
            },
            tooltip: {
              container: {
                background: isDarkMode ? "#333" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
              },
            },
            labels: {
              text: {
                fill: isDarkMode ? "#fff" : "#000", // Ensures labels are visible in both modes
                fontSize: 12, // Reduce font size for point labels
              },
            },
          }}
        />
      </Scrollbars>
    </div>
  );
};

export default StockLineChart;
