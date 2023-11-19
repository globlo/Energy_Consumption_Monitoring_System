
import React, { useState } from 'react';
import RealTimeCurrentChart from './RealTimeCurrentChart';
import RealTimeWattChart from './RealTimeWattChart';


const ChartSelector = ({ device, currentValue }) => {
  const [selectedChart, setSelectedChart] = useState('both');

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    setSelectedChart(value);
  };

  return (
    <div>
      <h2>{device}</h2>
      <select value={selectedChart} onChange={handleSelectionChange}>
        <option value="both">Current & Watt</option>
        <option value="current">Current (A)</option>
        <option value="watt">Power (W) </option>
      </select>

      {selectedChart === 'both' || selectedChart === 'current' ? (
        <RealTimeCurrentChart deviceName={device} currentValue={currentValue} />
      ) : null}
      {selectedChart === 'both' || selectedChart === 'watt' ? (
        <RealTimeWattChart deviceName={device} currentValue={currentValue} />
      ) : null}
    </div>
  );
};

export default ChartSelector;
