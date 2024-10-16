import React from "react";
import { DataGrid } from "@mui/x-data-grid";
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
    { field: "id", headerName: "ID", width: 60 },
    { field: "ticker", headerName: "Ticker", width: 80 },
    { field: "price", headerName: "Price", width: 120, editable: true },
    { field: "volume", headerName: "Volume", width: 120, editable: true },
    { field: "date", headerName: "Date", width: 120 },
  ];

  return (
    <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
      <Scrollbars style={{ height: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          processRowUpdate={handleProcessRowUpdate}
          sx={{
            "& .MuiDataGrid-root": {
              borderColor: isDarkMode ? "#333" : "#ccc",
            },
            "& .MuiDataGrid-cell": {
              color: isDarkMode ? "#fff" : "#000",
              fontSize: "0.8rem", // Adjust font size if needed
              padding: "4px 8px", // Reduced padding to make rows more compact
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: isDarkMode ? "#333" : "#eee",
              color: "#4bad93", // Change header text color
              fontSize: "0.9rem", // Adjust font size of headers
            },
            "& .MuiDataGrid-row": {
              maxHeight: "35px", // Reduce row height
              minHeight: "35px", // Ensure the minimum height is the same
            },
            "& .MuiDataGrid-cell--editable": {
              backgroundColor: isDarkMode ? "#222" : "#fafafa", // Keep edit mode cells visible
            },
          }}
        />
      </Scrollbars>
    </div>
  );
};

export default StockDataGrid;
