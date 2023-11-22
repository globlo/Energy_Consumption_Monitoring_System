// SettingsModal.js
import React from 'react';
import DeviceSettings from './DeviceSettings';

const SettingsModal = ({ showSettings, setShowSettings, devices, setDevices }) => {
  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  return (
    <div>
      {showSettings && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleSettingsClose}></div>
          <div className="modal-content">
            <div className="box">
              <h2 className="title is-3">Device Settings</h2>
              {devices.map((device, index) => (
                <DeviceSettings
                  key={index}
                  deviceName={device}
                  setDeviceName={(newDeviceName) => {
                    const updatedDevices = [...devices];
                    updatedDevices[index] = newDeviceName;
                    setDevices(updatedDevices);
                  }}
                  setShowSettings={setShowSettings}
                />
              ))}
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={handleSettingsClose}
          ></button>
        </div>
      )}
    </div>
  );
};

export default SettingsModal;
