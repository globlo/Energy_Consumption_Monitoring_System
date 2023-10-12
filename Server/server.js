// const os = require('os');

// const networkInterfaces = os.networkInterfaces();
// const localIp = networkInterfaces['Wi-Fi'][1].address; // Change 'Wi-Fi' to the appropriate interface on your system

// console.log('Local IP Address:', localIp);



const net = require('net');

const client = new net.Socket();

client.connect(80, "194.180.179.174", () => {
  console.log('Connected to Arduino');
});

client.on('data', (data) => {
  console.log('Data received from Arduino:', data.toString());
});

client.on('close', () => {
  console.log('Connection to Arduino closed');
});
