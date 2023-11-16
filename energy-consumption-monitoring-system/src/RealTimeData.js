import React, { useState, useEffect } from 'react';

const RealTimeData = (initialData, interval) => {
  const [realTimeData, setRealTimeData] = useState([...initialData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedData = realTimeData.map(item => {
        const newValue = Math.random() * 20;
        const newValues = [...item.values, newValue];
        if (newValues.length > 10) {
          newValues.shift();
        }
        return { ...item, values: newValues };
      });
      setRealTimeData(updatedData);
    }, interval);

    return () => clearInterval(intervalId);
  }, [realTimeData, interval]);

  return realTimeData;
};

export default RealTimeData;
