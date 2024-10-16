import React, { useEffect, useState } from 'react';
import './StockTicker.css';
import axios from 'axios';

const StockTicker = ({ isDarkMode }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const symbol = 'TSCO.LON';  // Single stock symbol for demo
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=demo`);

        const stockData = response.data['Time Series (Daily)'];
        const extractedData = Object.entries(stockData).map(([date, values]) => ({
          symbol,
          date,
          price: values['1. open'],
        }));

        // We will take the first 10 entries to show recent data
        setStocks(extractedData.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <div>Loading stock data...</div>;
  }

  return (
    <div className={`ticker-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="ticker">
        {stocks.map((stock, index) => (
          <div key={index} className="ticker-item">
            <span className="ticker-symbol">{stock.symbol}</span>:
            <span className="ticker-price">£{parseFloat(stock.price).toFixed(2)}</span>
            <span className="ticker-date">({stock.date})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
