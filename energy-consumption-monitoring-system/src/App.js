// App.js
import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';
import ChartSelector from './ChartSelector';
import Table from './Table';
import Totals from './Totals';
import io from 'socket.io-client';
// import 'bootstrap/dist/css/bootstrap.min.css'; 

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

      <h1 class="title is-1 has-text-centered ">Home Energy Consumption</h1>

      

      <div class="columns">
        <div class="column"> 
          <Totals currents={currents}></Totals>
        </div>
        <div class="column"> 
          <Table devices={devices} currents={currents}/>
        </div>
        
        <div class="column">
          <PieChart title={"Energy Distribution by Devices"} values={currents} labels={devices}/>
        </div>
      </div>
      

      <div class="tile is-ancestor" >
        {combinedData.map((item) => (
          <ChartSelector
            key={item.device}
            deviceName={item.device}
            currentValue={item.currentValue}

          />
        ))}
      </div>
    </div>
  );
};

export default App;
