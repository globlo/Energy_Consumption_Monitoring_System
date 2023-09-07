import React, { useEffect, useState  } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
// import data from "./mps.json" assert { type: 'json' };;

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats
// const data = [['attribute', 'attribute2'], ['value1', 'value2']];
const data = require('./mps.json');
function PivotTableComponent() {
  const [state, setState] = useState({});
  // const [data, setData] = useState([]);

  // useEffect(() => {

  //   fetch('/data.json')
  //     .then((response) => response.json())
  //     .then((jsonData) => setData(jsonData))
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });


  // }, []);


  return (
    <div>
      <PivotTableUI
          data={data}
          onChange={(s) => setState(s)}
          renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
          {...state}
      />
    </div>
    
  );
    
}

export default PivotTableComponent;