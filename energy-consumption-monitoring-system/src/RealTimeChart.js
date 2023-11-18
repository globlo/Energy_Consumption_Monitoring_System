import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const RealTimeChart = ({deviceName, currentValue}) => {
  const [data, setData] = useState([{ x: [], y: [], type: 'scatter', mode: 'lines+markers' }]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data update
      const newData = {
        x: [...data[0].x, new Date()],
        y: [...data[0].y, currentValue],
      };

      // Keep only the data points within the last 40 seconds
      const newDataTrimmed = {
        x: newData.x.slice(-30),
        y: newData.y.slice(-30),
      };

      setData([newDataTrimmed]);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div>
      <Plot
        data={data}
        layout={{ title: deviceName, xaxis: { title: 'Time' }, yaxis: { title: 'Current' } }}
      />
    </div>
  );
};

export default RealTimeChart;
