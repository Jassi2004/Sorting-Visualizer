import React, { useState, useEffect } from 'react';
import Button from './Button'; // Import the Button component
import RangeSlider from './helperComponents/RangeSlider'; // Import the RangeSlider component
import SelectDropdown from './helperComponents/SelectDropdown'; // Import the SelectDropdown component

const ControlPanel = ({ onStart, onPause, onReset, setArraySize, setSpeed, isSorting, algorithm, setAlgorithm }) => {
  const [localArraySize, setLocalArraySize] = useState(10);
  const [localSpeed, setLocalSpeed] = useState(500);

  const algorithmOptions = [
    { label: 'Bubble Sort', value: 'Bubble Sort' },
    { label: 'Quick Sort', value: 'Quick Sort' },
    { label: 'Merge Sort', value: 'Merge Sort' },
  ];

  const handleStart = () => {
    setArraySize(localArraySize);
    setSpeed(localSpeed);
    onStart(algorithm, localArraySize, localSpeed);
  };

  // Update local speed when the speed prop changes
  useEffect(() => {
    if (isSorting) {
      setLocalSpeed(500); // Reset to a default speed when sorting starts
    }
  }, [isSorting]);

  return (
    <div className="control-panel">
      <div className="control-panel-adjustment">
        <div className="control-group-adjustment">
          <div className="control-group">
            <label>Set Algorithm To Use: </label>
            <SelectDropdown
              options={algorithmOptions}
              selectedValue={algorithm}
              onChange={setAlgorithm}
              disabled={isSorting}
            />
          </div>
          
          {/* Array Size Slider */}
          <div className="control-group">
            <label>Set Array Size to sort: </label>
            <RangeSlider
              label={`${localArraySize}`} // Display the current size
              min={5}
              max={40}
              value={localArraySize} // Connect to local state
              onChange={(e) => setLocalArraySize(Number(e.target.value))}
              disabled={isSorting}
            />
          </div>
          
          {/* Speed Slider */}
          <div className="control-group">
            <label>Set Speed Animation: </label>
            <RangeSlider
              label={`${localSpeed}ms`} // Display the current speed
              min={1}
              max={1000}
              value={1001 - localSpeed} // Invert the speed for the slider
              onChange={(e) => setLocalSpeed(1001 - Number(e.target.value))}
              disabled={isSorting}
            />
          </div>
        </div>

        <div className="button-group-adjustment">    
          <Button color="" label="Start" onClick={handleStart} disabled={isSorting} />
          <Button color="" label="Pause" onClick={onPause} disabled={!isSorting} />
          <Button color="" label="Reset" onClick={onReset} disabled={isSorting} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ControlPanel);
