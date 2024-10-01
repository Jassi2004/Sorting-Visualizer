import React, { useState, useEffect } from 'react';
import Button from './Button';
import RangeSlider from './helperComponents/RangeSlider';
import SelectDropdown from './helperComponents/SelectDropdown';

const ControlPanel = ({ onStart, onPause, onResume, onReset, setArraySize, setSpeed, isSorting, isPaused, algorithm, setAlgorithm, arraySize, speed, onCustomArrayInput }) => {
  const [localArraySize, setLocalArraySize] = useState(arraySize);
  const [localSpeed, setLocalSpeed] = useState(speed);
  const [customArrayInput, setCustomArrayInput] = useState('');

  const algorithmOptions = [
    { label: 'Bubble Sort', value: 'Bubble Sort' },
    { label: 'Quick Sort', value: 'Quick Sort' },
    { label: 'Merge Sort', value: 'Merge Sort' },
  ];

  useEffect(() => {
    setLocalArraySize(arraySize);
  }, [arraySize]);

  useEffect(() => {
    setLocalSpeed(speed);
  }, [speed]);

  const handleArraySizeChange = (newSize) => {
    setLocalArraySize(newSize);
    setArraySize(newSize);
  };

  const handleSpeedChange = (newSpeed) => {
    setLocalSpeed(newSpeed);
    setSpeed(newSpeed);
  };

  const handleCustomArraySubmit = (e) => {
    e.preventDefault();
    const customArray = customArrayInput.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
    if (customArray.length > 0) {
      onCustomArrayInput(customArray);
      setCustomArrayInput('');
    }
  };

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
          
          <div className="control-group">
            <label>Set Array Size to sort: </label>
            <RangeSlider
              label={`${localArraySize}`}
              min={5}
              max={30}
              value={localArraySize}
              onChange={(e) => handleArraySizeChange(Number(e.target.value))}
              disabled={isSorting}
            />
          </div>
          
          <div className="control-group">
            <label>Set Speed Animation: </label>
            <RangeSlider
              label={`${localSpeed}ms`}
              min={1}
              max={1000}
              value={1001 - localSpeed}
              onChange={(e) => handleSpeedChange(1001 - Number(e.target.value))}
              disabled={isSorting}
            />
          </div>

          <div className="control-group">
            <label>Custom Array Input: </label>
            <form onSubmit={handleCustomArraySubmit}>
              <input
                type="text"
                value={customArrayInput}
                onChange={(e) => setCustomArrayInput(e.target.value)}
                placeholder="Enter numbers separated by commas"
                disabled={isSorting}
              />
              <button type="submit" disabled={isSorting}>Set Custom Array</button>
            </form>
          </div>
        </div>

        <div className="button-group-adjustment">    
          <Button color="" label="Start" onClick={onStart} disabled={isSorting} />
          {isPaused ? (
            <Button color="" label="Resume" onClick={onResume} disabled={!isSorting} />
          ) : (
            <Button color="" label="Pause" onClick={onPause} disabled={!isSorting} />
          )}
          <Button color="" label="Reset" onClick={onReset} disabled={isSorting && !isPaused} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ControlPanel);