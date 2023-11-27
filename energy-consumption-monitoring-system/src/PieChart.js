import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = ({currents, labels }) => {
  const data = [{
    type: 'pie',
    values: currents,
    labels: labels,
    textinfo: 'label+percent',
    insidetextorientation: 'radial',
  }];

  const layout = {
    height: window.innerWidth * 0.25,
    width: window.innerWidth * 0.25,
    title: "Energy Distribution by Devices",
  };

  return (
    <div >
      <Plot
        data={data}
        layout={layout}
      />
    </div>
  );
};

export default PieChart;
