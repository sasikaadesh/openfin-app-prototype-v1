import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomScrollbar = ({ children }) => {
  return (
    <Scrollbars
      style={{ width: '100%', height: '100%' }} // Adjust as needed
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#888', // Customize thumb color
            borderRadius: '10px', // Customize thumb shape
            width: '8px', // Customize thumb width
            marginRight: '2px', // Space between thumb and track
          }}
        />
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#f0f0f0', // Customize track color
            borderRadius: '10px',
            width: '10px', // Customize track width
            right: '0px',
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;
