import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';

const LineChart = ({ data, layout, filteredData, selectedCategories, setChartData }) => {
  useEffect(() => {
    const charts = selectedCategories.map(category => {
      const filteredCategoryData = filteredData.find(item => item.category === category);
      const values = filteredCategoryData ? filteredCategoryData.values : [];

      return {
        x: [...Array(values.length).keys()],
        y: values,
        type: 'scatter',
        mode: 'lines+markers',
        name: category,
        line: { color: 'blue' },
        marker: { color: 'green' },
      };
    });

    setChartData(charts);
  }, [filteredData, selectedCategories, setChartData]);

  return data.length > 0 ? (
    <Plot
      data={data}
      layout={layout}
      config={{ responsive: true }}
    />
  ) : (
    <p>No data to display.</p>
  );
};

export default LineChart;
