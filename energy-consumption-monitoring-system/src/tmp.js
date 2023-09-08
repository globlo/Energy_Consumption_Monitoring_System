import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Plot from 'react-plotly.js';

const data = [
  { category: 'A', value: 10 },
  { category: 'B', value: 15 },
  { category: 'C', value: 8 },
  { category: 'D', value: 20 },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Filter data based on the selected category
    if (selectedCategory) {
      const filtered = data.filter(item => item.category === selectedCategory.value);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Prepare data for the bar chart
    const categories = filteredData.map(item => item.category);
    const values = filteredData.map(item => item.value);

    const chartData = [
      {
        x: categories,
        y: values,
        type: 'bar',
        marker: {
          color: 'blue',
        },
      },
    ];

    setChartData(chartData);
  }, [filteredData]);

  const categoryOptions = [
    { value: 'A', label: 'Category A' },
    { value: 'B', label: 'Category B' },
    { value: 'C', label: 'Category C' },
    { value: 'D', label: 'Category D' },
  ];

  return (
    <div className="App">
      <h1>Data Filtering and Plotting</h1>
      <Select
        options={categoryOptions}
        isClearable={true}
        onChange={option => setSelectedCategory(option)}
        value={selectedCategory}
        placeholder="Select a category"
      />
      <div style={{ marginTop: '20px' }}>
        {filteredData.length > 0 ? (
          <Plot
            data={chartData}
            layout={{ title: 'Bar Chart' }}
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
