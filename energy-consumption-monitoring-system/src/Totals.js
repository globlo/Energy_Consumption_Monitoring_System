import React, { useState } from 'react';

const Totals = ({currents}) => {
//   const [devices, setDevices] = useState([
//     { device: 'Device1', current: 2.5 },
//     { device: 'Device2', current: 3.0 },
//     { device: 'Device3', current: 1.8 },
//   ]);

  // Function to calculate the total current and watt
  const calculateTotals = () => {
    let totalCurrent = 0;
    let totalWatt = 0;

    currents.forEach((cu) => {
      totalCurrent += cu;
      totalWatt += cu * 120; // Assuming a standard conversion factor
    });

    return { totalCurrent, totalWatt };
  };

  const { totalCurrent, totalWatt } = calculateTotals();

  return (
    <div class="box " style={{ width: "100%"}}>


        <div class="section ">
            <div class="level-item has-text-centered box has-background-dark has-text-white">
                <div class="is-spaced"> 
                <p class="heading is-size-6">Total Current</p>
                <p class="title is-size-2 has-text-info">{totalCurrent.toFixed(2)} A</p>
                </div>
            </div>
            <div class="level-item has-text-centered box has-background-dark has-text-white"> 
                <div>
                <p class="heading is-size-6">Total Power</p>
                <p class="title is-size-2 has-text-warning">{totalWatt.toFixed(2)} W</p>
                </div>
            </div>
        </div>


    </div>
  );
};

export default Totals;
