/////////////////////////////////////for ESP8266
const express = require('express');
const bodyParser = require('body-parser');

const router = express();
const sensor_Port = 7000;
const sensor_IPv4 = '192.168.0.134';

// Object to store current values for each sensor
let sensorData = {};

/////////////////////////////////////for React
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());


/////////////////////////////////////for ESP8266


router.use(bodyParser.urlencoded({ extended: true }));

// Handle HTTP GET requests
router.get('/', (req, res) => {
  console.log('GET request');
  res.send('This is a GET request response. Hey from Server!');
});

// Handle HTTP POST requests
router.post('/', (req, res) => {
  const sensorId = String(req.body.SensorId);
  const current = parseFloat(req.body.Current);
  console.log(`Received POST request from Sensor ${sensorId} with Current=${current}`);

  // Store the received data in the object
  if (!sensorData[sensorId]) {
    sensorData[sensorId] = [];
    console.log(`New sensor detected with ID: ${sensorId}`);
  }

  sensorData[sensorId] = current;

  // Process the received data
  // You can add your logic here, such as storing the data or sending a response

  res.send('POST request received and processed successfully.');
});

router.listen(sensor_Port, sensor_IPv4, () => { // sonsor
  console.log(`Server is listening on port ${sensor_Port}`);
});


//////////////////////////////////////for React
const listening_React = app.listen(4000, () => {
  console.log("Server is up & running *4000");
});

io = require("socket.io")(listening_React, {
  cors: {
    origin: "*",
  },
});


const store_dummy_data = (deviceNames, currentValues) => {
  let devicesList = ['AC', 'TV', 'DishWasher', 'Standing Lamp','TreadMill','Desk Top'];
  while (deviceNames.length < 4) {
    
    deviceNames.push(devicesList[0]);
    currentValues.push(Math.random() * (5 - 0) + 0);

    console.log(`New sensor detected with ID: ${devicesList[0]}`);

    devicesList.shift();


  }


};

// Socket.IO connection
io.on('connection', (socket) => {
  console.log("Connected & Socket Id is ", socket.id);

  // Periodically emit real-time data
  const sendRealtimeData = () => {
    

    const deviceNames = Object.keys(sensorData);
    const currentValues = Object.values(sensorData);

    //Fill Up the number of devices to 4 for demo.
    store_dummy_data(deviceNames, currentValues);


    // Emit the current data for all sensors to connected clients (React frontend)
    socket.emit('Realtime', deviceNames, currentValues);
    console.log('devices sent:', deviceNames);
    console.log('currentValues sent:', currentValues);

    // sensorData = {}; //empty the dictionary after sent datas

  };

  // Initial emission on connection
  sendRealtimeData();

  // Periodic emissions every 2 seconds (adjust as needed)
  const intervalId = setInterval(sendRealtimeData, 5000);

  // Clean up on socket disconnect
  socket.on('disconnect', () => {
    console.log(intervalId);
  });

  socket.on('changeDeviceName', (devices) => {
    console.log('changeDeviceName'+devices);
    //sensorData
    console.log('sensorData'+sensorData);

    const deviceNames = Object.keys(sensorData);

    for(var i =0; i < devices.length; i++){

      let exist_device_i = deviceNames[i];

      if(devices[i] != String(exist_device_i)){
        console.log("not matching "+i);
        console.log(devices[i] + " --- " + exist_device_i);

        // Create a new key with the same value
        sensorData[devices[i]] = sensorData[exist_device_i];

        // Delete the old key
        delete sensorData[exist_device_i];

      }

    }



  });


});


