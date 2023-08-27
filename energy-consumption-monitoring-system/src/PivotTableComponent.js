import React from 'react';
import ReactDOM from 'react-dom';
import 'react-pivottable/pivottable.css'; // Import PivotTable.js styles
import PivotTableUI from 'react-pivottable/PivotTableUI';
import tempData from './mps.json';

const PivotTableComponent = () => {
// const data = [
//         {"Level": 2, "Age": 22, "Name": "Liu, Laurin", "weight": "35.2"},
//         {"Level": 5, "Age": 43, "Name": "Mourani, Maria", "weight": "24.4"},
//         ];
const data = [['attribute', 'attribute2'], ['value1', 'value2']];
  return (
    <div>
      <PivotTableUI
        data={data} // Your data array
        onChange={() => {}} // Optional callback when the table changes
      />
    </div>
  );
};

export default PivotTableComponent;