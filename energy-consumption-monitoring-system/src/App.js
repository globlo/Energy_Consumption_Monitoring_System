// App.js
import React, { useEffect, useState } from 'react';
import ChartSelector from './ChartSelector';
import io from 'socket.io-client';

const App = () => {
  const [currents, setCurrents] = useState([]);
  const [devices, setDevices] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const socket = io.connect('http://localhost:4000');

    // Listen for "Realtime" event and update state
    socket.on('Realtime', (deviceNames, currentValues) => {
      setCurrents(currentValues);
      setDevices(deviceNames);

      const newCombinedData = deviceNames.map((device, index) => ({
        device,
        currentValue: currentValues[index],
        // selectedChart: selectedChart,
      }));
      setCombinedData(newCombinedData);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div>
      <h1>Home Energy Consumption Monitoring System</h1>
      <div>
        {combinedData.map((item) => (
          <ChartSelector
            key={item.device}
            device={item.device}
            currentValue={item.currentValue}

          />
        ))}
      </div>
    </div>
  );
};

export default App;
