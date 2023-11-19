
import React, { useState } from 'react';
import RealTimeCurrentChart from './RealTimeCurrentChart';
import RealTimeWattChart from './RealTimeWattChart';


const ChartSelector = ({ deviceName,currentValue }) => {
  const [selectedChart, setSelectedChart] = useState('both');
  const [device, setDevice] = useState(deviceName);

  const handleSelectionChange = (e) => {
    setSelectedChart(e.target.value);
  };

  // const handleDeviceChange = (e) => {
  //   setDevice(e.target.innerText);
  // };

  return (
    <div  class="box">
       <h3 class="title is-4 has-text-centered">
        {device}
      </h3>
      <div class="dropdown-trigger has-text-centered">
      <select class="button is-centered is-primary" value={selectedChart} onChange={handleSelectionChange}>
        <option value="both">Current (A) -  Power (W) </option>
        <option value="current">Current (A)</option>
        <option value="watt">Power (W) </option>
      </select>
      </div>
      
      <div class="column">
        {selectedChart === 'both' || selectedChart === 'current' ? (
          <div class="column">
          <RealTimeCurrentChart deviceName={device} currentValue={currentValue} />
          </div>
        ) : null}
        {selectedChart === 'both' || selectedChart === 'watt' ? (
          <div class="column">
          <RealTimeWattChart deviceName={deviceName} currentValue={currentValue} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChartSelector;
