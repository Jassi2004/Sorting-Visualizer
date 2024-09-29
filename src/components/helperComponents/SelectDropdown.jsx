import React from 'react';
import './SelectDropdown.css'; // Import the CSS for styling

const SelectDropdown = ({ options, selectedValue, onChange, disabled }) => {
  return (
    <div className="select" tabIndex="1">
      {options.map((option) => (
        <div key={option.value}>
          <input
            className="selectopt"
            name="algorithm"
            type="radio"
            id={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
          />
          <label htmlFor={option.value} className="option">{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default SelectDropdown;
