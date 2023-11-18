import React, { useEffect, useState } from 'react';
import RealTimeChart from './RealTimeChart';
// import fetchData  from './DataFetcher';
import io from "socket.io-client";

const App = () => {
  const [currents, setCurrents] = useState([]);
  const [devices, setDevices] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  
  const combineData = (deviceNames, currentValues) => {
    return deviceNames.map((device, index) => ({
      device,
      currentValue: currentValues[index],
    }));
  };

  useEffect(() => {
    const socket = io.connect("http://localhost:4000");

    // Listen for "Realtime" event and update state
    socket.on("Realtime", (deviceNames, currentValues) => {
      
      // console.log(deviceNames);
      setCurrents(currentValues);
      setDevices(deviceNames);
      // console.log(currents);
      // console.log(devices);

      const newCombinedData = combineData(devices, currents);

    
      // Update the combinedData state
      // console.log(newCombinedData);
      setCombinedData(newCombinedData);
      console.log(combinedData);

    });

    // Clean up on component unmount
    return () => { socket.disconnect() };
  }, [devices, currents]);

  return (
    <div>
      <h1>Home Energy Consumption Monitoring System</h1>
      <div>
        {/* Map through the combinedData array to render each item */}
        {combinedData.map((item) => (
          
          <RealTimeChart deviceName={item.device} currentValue={item.currentValue}/>
        ))}
      </div>
 
    </div>
  );
};

export default App;
