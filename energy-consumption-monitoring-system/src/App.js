import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Plot from 'react-plotly.js';

const data = [
  { category: 'A', values: [] },
  { category: 'B', values: [] },
  { category: 'C', values: [] },
  { category: 'D', values: [] },
];

function App() {
  const [selectedCategories, setSelectedCategories] = useState(data.map(item => item.category));
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [realTimeData, setRealTimeData] = useState([...data]);

  useEffect(() => {
    // Simulate real-time updates (replace with actual data fetching logic)
    const interval = setInterval(() => {
      const updatedData = realTimeData.map(item => {
        const newValue = Math.random() * 20; // Generate a new random value
        const newValues = [...item.values, newValue]; // Add the newest value to the end
        if (newValues.length > 10) {
          newValues.shift(); // Remove the oldest value if there are more than 10 values
        }
        return { ...item, values: newValues };
      });
      setRealTimeData(updatedData);
    }, 2000); // Update data every 2 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [realTimeData]);

  useEffect(() => {
    // Filter data based on the selected categories
    const filtered = realTimeData.filter(item => selectedCategories.includes(item.category));
    setFilteredData(filtered);
  }, [selectedCategories, realTimeData]);

  useEffect(() => {
    // Prepare data for the line charts
    const charts = selectedCategories.map(category => {
      const filteredCategoryData = filteredData.find(item => item.category === category);
      const values = filteredCategoryData ? filteredCategoryData.values : [];

      return {
        x: [...Array(values.length).keys()], // Create an array of indices as x values
        y: values,
        type: 'scatter',
        mode: 'lines+markers',
        name: category,
        line: {
          color: 'blue',
        },
        marker: {
          color: 'green',
        },
      };
    });

    setChartData(charts);
  }, [filteredData, selectedCategories]);

  const categoryOptions = data.map(item => ({
    value: item.category,
    label: `Category ${item.category}`,
  }));

  return (
    <div className="App">
      <h1>Real-Time Data and Flowing Line Chart</h1>
      <Select
        options={categoryOptions}
        isMulti={true}
        onChange={options => setSelectedCategories(options.map(option => option.value))}
        value={selectedCategories.map(category => ({
          value: category,
          label: `Category ${category}`,
        }))}
        placeholder="Select categories"
      />
      <div style={{ marginTop: '20px' }}>
        {filteredData.length > 0 ? (
          <Plot
            data={chartData}
            layout={{
              title: 'Real Time Current',
              xaxis: { title: 'Time' },
              yaxis: { title: 'Current' },
            }}
            config={{ responsive: true }}
          />
        ) : (
          <p>No data to display.</p>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
