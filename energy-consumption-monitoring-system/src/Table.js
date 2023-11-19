import React from 'react';
import Plot from 'react-plotly.js';

const Table = ({ devices, currents }) => {
  const tableData = [
    {
      Header: 'Device',
      accessor: 'device',
    },
    {
      Header: 'Current',
      accessor: 'current',
    },
    {
        Header: 'Watt',
        accessor: 'watt',
      },
  ];

  // Assuming devices and currents are arrays of the same length
  const tableContent = devices.map((device, index) => ({
    device,
    current: currents[index].toFixed(2), // Assuming currents correspond to each device
    watt: (currents[index] * 120).toFixed(2),
  }));

  return (
    <div>
      <Plot
        data={[
          {
            type: 'table',
            header: {
              values: tableData.map((column) => column.Header),
            },
            cells: {
              values: tableData.map((column) => tableContent.map((row) => row[column.accessor])),
            },
          },
        ]}
        layout={{
          width: 500,
          height: 400,
          title: 'Energy Usage Summary',
        }}
      />
    </div>
  );
};

export default Table;
