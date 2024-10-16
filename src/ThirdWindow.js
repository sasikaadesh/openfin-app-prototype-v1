import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { initialData } from "./data/StockData"; // Importing stock data
import { CssBaseline } from "@mui/material";
import StockLineChart from "./components/StockLineChart";
import { fin } from "@openfin/core";

const ThirdWindow = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const updateHandler = (updatedData) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedData.id ? updatedData : item
        )
      );
    };

    const subscribeToUpdates = async () => {
      if (typeof fin !== "undefined") {
        await fin.InterApplicationBus.subscribe(
          { uuid: "*" },
          "updateData",
          updateHandler
        );
      }
    };

    subscribeToUpdates();

    return () => {
      if (typeof fin !== "undefined") {
        fin.InterApplicationBus.unsubscribe(
          { uuid: "*" },
          "updateData",
          updateHandler
        );
      }
    };
  }, []);

  // Data Grid Editable working
  const chartData = [
    {
      id: "Stock Prices",
      data: data.map((item) => ({ x: item.date, y: item.price })),
    },
  ];

  // Line Chart color lines
  // const chartData =
  //   data && data.length > 0
  //     ? data.map((stock) => ({
  //         id: stock.ticker,
  //         data: stock.values.map((value) => ({
  //           x: value.date,
  //           y: value.price,
  //         })),
  //       }))
  //     : [];

  // const chartData =
  //   data && data.length > 0
  //     ? data.map((stock) => ({
  //         id: stock.ticker,
  //         data: stock.values.map((value) => ({
  //           x: value.date,
  //           y: value.price,
  //         })),
  //       }))
  //     : [];

  useEffect(() => {
    // Load theme from localStorage when the window starts
    const storedTheme = localStorage.getItem("theme");
    const initialIsDarkMode = storedTheme === "dark";
    setIsDarkMode(initialIsDarkMode);

    if (typeof fin !== "undefined") {
      // Subscribe to theme-change messages
      fin.InterApplicationBus.subscribe(
        { uuid: "*" },
        "theme-change",
        (message) => {
          setIsDarkMode(message.isDarkMode);
        }
      );
    }
  }, []);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#f2f0f0",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#060b28f0",
      },
    },
  });

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ padding: "20px" }}>
        <h1 className="line">Stock Data - Line Chart</h1>
        <StockLineChart isDarkMode={isDarkMode} chartData={chartData} />
      </div>
    </ThemeProvider>
  );
};

export default ThirdWindow;
