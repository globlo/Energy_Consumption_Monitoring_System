
import React, { useState } from 'react';
import RealTimeCurrentChart from './RealTimeCurrentChart';
import RealTimeWattChart from './RealTimeWattChart';


const ChartSelector = ({ deviceName,currentValue }) => {
  const [selectedChart, setSelectedChart] = useState('both');
  const [device, setDevice] = useState(deviceName);

  const handleSelectionChange = (e) => {
    setSelectedChart(e.target.value);
  };

  const handleDeviceChange = (e) => {
    setDevice(e.target.innerText);
  };

  return (
    <div>
       <h2 contentEditable={true} onBlur={handleDeviceChange}>
        {device}
      </h2>
      <select value={selectedChart} onChange={handleSelectionChange}>
        <option value="both">Current & Watt</option>
        <option value="current">Current (A)</option>
        <option value="watt">Power (W) </option>
      </select>

      {selectedChart === 'both' || selectedChart === 'current' ? (
        <RealTimeCurrentChart deviceName={device} currentValue={currentValue} />
      ) : null}
      {selectedChart === 'both' || selectedChart === 'watt' ? (
        <RealTimeWattChart deviceName={deviceName} currentValue={currentValue} />
      ) : null}
    </div>
  );
};

export default ChartSelector;
