import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = ({title, values, labels }) => {
  const data = [{
    type: 'pie',
    values: values,
    labels: labels,
    textinfo: 'label+percent',
    insidetextorientation: 'radial',
  }];

  const layout = {
    height: 400,
    width: 400,
    title: title,
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <Plot
        data={data}
        layout={layout}
      />
    </div>
  );
};

export default PieChart;
