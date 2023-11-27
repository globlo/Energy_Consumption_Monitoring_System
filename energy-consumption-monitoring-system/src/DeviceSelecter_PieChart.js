import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import PieChart from './PieChart'; // Adjust the import path based on your project structure

const DeviceSelecter_PieChart = ({ currents, devices}) => {
  const allDevices = devices;
  const allCurrents = currents;

  // State to manage selected devices
  const [selectedDevices, setSelectedDevices] = useState(allDevices);

  // Handler to update selected devices
  const handleDeviceSelection = (selected) => {
    setSelectedDevices(selected);
  };

  // Merge device names and current values into an array of objects
  const devicesData = allDevices.map((device, index) => ({
    name: device,
    current: allCurrents[index],
  }));

  // Filter current values based on selected devices
  const selectedCurrents = devicesData
    .filter((device) => selectedDevices.includes(device.name))
    .map((device) => device.current);

  // Initialize selected devices when the component mounts
  useEffect(() => {
    setSelectedDevices(devices);
  }, []); // Empty dependency array ensures this effect runs once when the component mounts


  return (
    <div>

      {/* Pass the selected devices and currents to the PieChart component */}
      <PieChart currents={selectedCurrents} labels={selectedDevices} />

      {/* Device selection controls */}
      <div>
        <h2>Select Devices:</h2>
        {devicesData.map((device) => (
          <label class="checkbox" key={device.name} >
            <input 
              type="checkbox"
              value={device.name}
              checked={selectedDevices.includes(device.name)}
              onChange={(e) => {
                const selected = e.target.checked
                  ? [...selectedDevices, e.target.value]
                  : selectedDevices.filter((d) => d !== e.target.value);
                handleDeviceSelection(selected);
              }}
            />
            {device.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DeviceSelecter_PieChart;
