import React from 'react';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { Typography } from '@mui/material';

const RadialBarChartComponent = ({ data, title, subtext, isDarkMode }) => {
  return (
    <div style={{ height: 130 }}>
      <Typography variant="h6" align="left" style={{ marginBottom: '2px', fontSize: '14px' }}>
        {title}
      </Typography>
      <Typography variant="body2" align="left" style={{ color: '#4bad93', marginBottom: '10px' }}>
        {subtext}
      </Typography>
      <ResponsiveRadialBar
        data={data}
        margin={{ top: 1, right: 20, bottom: 40, left: 20 }}
        startAngle={-130}
        endAngle={130}
        innerRadius={0.8}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableRadialGrid={false}
        enableCircularGrid={false}
        enableSliceLabels={false}
        enableRadialLabels={false}
        colors={{ scheme: 'set2' }}
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

export default RadialBarChartComponent;
