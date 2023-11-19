import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const RealTimeWattChart = ({ deviceName, currentValue }) => {
    const [data, setData] = useState([
        {
          x: [],
          y: [],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
        { type: 'bar', x: [], y: [] },
      ]);
    
      useEffect(() => {
        const interval = setInterval(() => {
          // Simulate real-time data update
          const newData = {
            x: [...data[0].x, new Date().toISOString()],
            y: [...data[0].y, currentValue * 120], // Sample random data
          };
    
          // Keep only the last 30 data points
          const newDataTrimmed = {
            x: newData.x.slice(-30),
            y: newData.y.slice(-30),
          };
    
          setData([newDataTrimmed, { type: 'bar', x: newDataTrimmed.x, y: newDataTrimmed.y }]);
        }, 1000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
      }, [data]);
    
      return (
        <Plot
          data={data}
          layout={{
            width: 600,
            height: 400,
            title: deviceName + " ("+(currentValue * 120).toFixed(2) + " W)",
            xaxis: { title: 'Time' },
            yaxis: { title: 'Power (W)' },
          }}
        />
      );
    };
export default RealTimeWattChart;