// App.js
import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';
import ChartSelector from './ChartSelector';
import Table from './Table';
import Totals from './Totals';
import SettingsModal from './SettingsModal';
import io from 'socket.io-client';
import DeviceSelecter_PieChart from './DeviceSelecter_PieChart';
// import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  const [currents, setCurrents] = useState([]);
  const [devices, setDevices] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  const socket_address = 'http://localhost:4000';

  const handleSettingButtonClick = () => {
    setShowSettings(true);
  };

  useEffect(() => {

    const socket = io.connect(socket_address);

    socket.emit('changeDeviceName', devices);

    console.log("sent");

    return () => {
      socket.disconnect();
    };
  }, [showSettings]);



  useEffect(() => {
    const socket = io.connect(socket_address);

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

      <h1 class="title is-1 has-text-centered box has-background-dark has-text-white">
        Home Energy Consumption
      </h1>

      <div class="content ">
        
        <button className="button is-primary" onClick={handleSettingButtonClick}>
          Open Settings
        </button>
        <SettingsModal
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          devices={devices}
          setDevices={setDevices}
        />
      </div>

      <div class="columns box has-background-dark">

        <div class="column"> 
          <Table devices={devices} currents={currents}/>
        </div>
        <div class="column"> 
          <Totals currents={currents}></Totals>
        </div>
        <div class="column box">
          <DeviceSelecter_PieChart currents={currents} devices={devices}/>
        </div>
      </div>
      
      <div class="columns box has-background-dark">
        <div class="tile is-ancestor has-background-dark" >
          {combinedData.map((item) => (
            <ChartSelector
              key={item.device}
              deviceName={item.device}
              currentValue={item.currentValue}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default App;
