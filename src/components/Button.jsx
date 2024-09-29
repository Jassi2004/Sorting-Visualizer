import React from 'react';
import './Button.css'; // Import the CSS for styling

const Button = ({ color, label, onClick, disabled }) => {
  return (
    <div className="btn" onClick={!disabled ? onClick : null}>
      <a href="#" style={{ backgroundColor: color }}>
        {label}
      </a>
    </div>
  );
};

export default Button;
