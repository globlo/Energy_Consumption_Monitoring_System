const express = require('express');
const bodyParser = require('body-parser');
const router = express();
const sensor_Port = 7000; // Specify the port to listen on microcontroller
const sensor_IPv4 = '192.168.0.134';

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  console.log("request GET")
  res.send('This is a GET request response. Hey from Server!');
});

// Handle HTTP POST requests
router.post('/', (req, res) => {
  // Assuming you're sending key-value pairs like "param1=value1&param2=value2"
  const C = req.body.Current;
  // const V = req.body.Voltage;

  console.log(`Received POST request with Current=${C} `);

  // Process the received data
  // You can add your logic here, such as storing the data or sending a response

  res.send('POST request received and processed successfully.');
});

router.listen(sensor_Port, sensor_IPv4, () => {
  console.log(`Server is listening on port ${sensor_Port}`);
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());

const server = app.listen(4000, () => {
  console.log("Server is up & running *4000");
});

io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
    console.log("Connected & Socket Id is ", socket.id);
  
    // Function to emit real-time data at regular intervals
    const sendRealtimeData = () => {
      
      const randomValue1 = Math.random() * (15 - 13) + 13;
      const randomValue2 = Math.random() * (15 - 13) + 13;
      const randomValue3 = Math.random() * (15 - 13) + 13;
      const randomValue4 = Math.random() * (15 - 13) + 13;

      const deviceNames = ['Fridge', 'TV', 'DishWasher', 'Standing Lamp'];
      const currentValues = [randomValue1, randomValue2, randomValue3, randomValue4];

      socket.emit("Realtime",  deviceNames, currentValues );
      console.log("data sent "+  currentValues);
    };
  
    // Initial emission on connection
    sendRealtimeData();
  
    // Periodic emissions every 2 seconds (adjust as needed)
    const intervalId = setInterval(sendRealtimeData, 2000);
  
    // Clean up on socket disconnect
    socket.on("disconnect", () => {
      clearInterval(intervalId);
    });
});