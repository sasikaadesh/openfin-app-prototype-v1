import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Typography } from '@mui/material';

const PieChartComponent = ({ data, title, subtext, isDarkMode }) => {
  return (
    <div style={{ height: 130 }}>
      <Typography variant="h6" align="left" style={{ marginBottom: '2px', fontSize: '14px' }}>
        {title}
      </Typography>
      <Typography variant="body2" align="left" style={{ color: '#4bad93', marginBottom: '10px' }}>
        {subtext}
      </Typography>
      <ResponsivePie
        data={data}
        margin={{ top: 1, right: 10, bottom: 50, left: 10 }}
        innerRadius={0.8} // Thinner circular lines
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        enableArcLinkLabels={false}
        enableArcLabels={false}
        theme={{
          labels: {
            text: {
              fill: isDarkMode ? '#ffffff' : '#000000',
            },
          },
        }}
      />
    </div>
  );
};

export default PieChartComponent;
