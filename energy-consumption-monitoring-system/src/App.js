import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SelectInput from './SelectInput';
import LineChart from './LineChart';
import RealTimeData from './RealTimeData';

const data = [
  { category: 'A', values: [] },
  { category: 'B', values: [] },
  { category: 'C', values: [] },
  { category: 'D', values: [] },
];

const categoryOptions = data.map(item => ({
  value: item.category,
  label: `Category ${item.category}`,
}));

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState(data.map(item => item.category));
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);  // Define filteredData here

  return (
    <div className="App">
      <h1>Real-Time Data and Flowing Line Chart</h1>
      <SelectInput
        options={categoryOptions}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        setFilteredData={setFilteredData}  // Pass setFilteredData to SelectInput
      />
      <div style={{ marginTop: '20px' }}>
        <LineChart
          data={chartData}
          layout={{
            title: 'Real Time Current',
            xaxis: { title: 'Time' },
            yaxis: { title: 'Current' },
          }}
          filteredData={filteredData}  // Use filteredData in LineChart
          selectedCategories={selectedCategories}
          setChartData={setChartData}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
