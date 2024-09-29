import React, { useState } from 'react';
import './RangeSlider.css'; // Import the required styles

const RangeSlider = ({ min = 0, max = 100, step = 1, value, onChange, label = "Range", disabled = false }) => {
  return (
    <div className="Range">
      <input 
        id="Range"
        name="Range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor="Range">{label}</label> {/* Label placed next to input */}
    </div>
  );
};

export default RangeSlider;
