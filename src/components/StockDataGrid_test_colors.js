import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { initialData } from "../data/StockData"; // Importing stock data from StockData.js
import { Scrollbars } from "react-custom-scrollbars-2";
import { fin } from "@openfin/core";

const StockDataGrid = ({ isDarkMode, data }) => {
  const handleProcessRowUpdate = (newRow) => {
    // Send updated data to the ThirdWindow
    fin.InterApplicationBus.publish("updateData", newRow);
    return newRow;
  };

  // Define columns for MUI Data Grid
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "ticker", headerName: "Ticker", width: 100 },
    { field: "price", headerName: "Price", width: 150, editable: true },
    { field: "volume", headerName: "Volume", width: 150, editable: true },
    { field: "date", headerName: "Date", width: 150 },
  ];

  // Ensure that each row has a unique `id`
  const formattedData = data.flatMap((stock) =>
    stock.values.map((value) => ({
      id: value.id, // Unique id from the values array
      ticker: stock.ticker, // Ticker from the parent
      price: value.price,
      volume: value.volume || null, // Ensure volume exists, or handle it
      date: value.date,
    }))
  );

  return (
    <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
      <Scrollbars style={{ height: "100%" }}>
        <DataGrid
          rows={formattedData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          processRowUpdate={handleProcessRowUpdate}
          getRowId={(row) => row.id} // Ensure each row has a unique id
          sx={{
            "& .MuiDataGrid-root": {
              borderColor: isDarkMode ? "#333" : "#ccc",
            },
            "& .MuiDataGrid-cell": {
              color: isDarkMode ? "#fff" : "#000",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: isDarkMode ? "#333" : "#eee",
            },
          }}
        />
      </Scrollbars>
    </div>
  );
};

export default StockDataGrid;
