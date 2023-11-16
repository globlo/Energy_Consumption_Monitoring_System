import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import RealTimeData from './RealTimeData';

const useSelectInputData = (initialData, realTimeData, selectedCategories) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = realTimeData.filter(item => selectedCategories.includes(item.category));
    setFilteredData(filtered);
  }, [selectedCategories, realTimeData]);

  return {
    filteredData,
  };
};

const SelectInput = ({ options, selectedCategories, setSelectedCategories, setFilteredData }) => {
  const realTimeData = RealTimeData(options.map(item => ({ category: item.value, values: [] })), 2000);
  const { filteredData } = useSelectInputData(options, realTimeData, selectedCategories);

  // Pass filteredData to App.js
  useEffect(() => {
    setFilteredData(filteredData);
  }, [filteredData, setFilteredData]);

  return (
    <Select
      options={options}
      isMulti={true}
      onChange={options => setSelectedCategories(options.map(option => option.value))}
      value={selectedCategories.map(category => ({
        value: category,
        label: `Category ${category}`,
      }))}
      placeholder="Select categories"
    />
  );
};

export default SelectInput;
