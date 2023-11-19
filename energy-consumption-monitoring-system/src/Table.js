import React from 'react';

const Table = ({ devices, currents, setDevices}) => {
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
      <table>
        <thead>
          <tr>
            {tableData.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableContent.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {tableData.map((column) => (
                <td key={`${rowIndex}-${column.accessor}`}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
