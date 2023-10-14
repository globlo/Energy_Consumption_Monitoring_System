const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7000; // Specify the port you want to listen on

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log("request GET")
  res.send('This is a GET request response. Hey from Server!');
});

// Handle HTTP POST requests
app.post('/', (req, res) => {
  // Assuming you're sending key-value pairs like "param1=value1&param2=value2"
  const C = req.body.Current;
  const V = req.body.Voltage;

  console.log(`Received POST request with Current=${C} and Voltage=${V}`);

  // Process the received data
  // You can add your logic here, such as storing the data or sending a response

  res.send('POST request received and processed successfully.');
});

app.listen(port, '192.168.0.142', () => {
  console.log(`Server is listening on port ${port}`);
});

