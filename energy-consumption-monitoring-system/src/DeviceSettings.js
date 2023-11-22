// DeviceSettings.js
import React, { useState } from 'react';

const DeviceSettings = ({ deviceName, setDeviceName, setShowSettings }) => {
  const [editMode, setEditMode] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState(deviceName);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setDeviceName(newDeviceName);
    setEditMode(false);
    setShowSettings(false); // Close the modal after saving
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setShowSettings(false); // Close the modal without saving
  };

  const handleInputChange = (e) => {
    setNewDeviceName(e.target.value);
  };

  return (
    <div>
      <p>{deviceName}</p>

      {editMode ? (
        <div>
          <input
            className="input"
            type="text"
            value={newDeviceName}
            onChange={handleInputChange}
            placeholder="Enter new device name"
          />
          <button className="button is-success" onClick={handleSaveClick}>
            Save
          </button>
          <button className="button is-danger" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="button is-warning" onClick={handleEditClick}>
          Edit Device Name
        </button>
      )}
    </div>
  );
};

export default DeviceSettings;
