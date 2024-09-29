import React from 'react';

const Visualizer = ({ showBars, array }) => {
  const maxValue = Math.max(...array);
  const barWidth = 10; // Set a fixed width for the bars

  return (
    <div className="visualizer-container">
      <div className="visualizer">
        {showBars && array.map((value, index) => (
          <div key={index} className="bar-container">
            <div
              id={`bar-${index}`}
              className="bar"
              style={{
                height: `${(value / maxValue) * 100}%`,
                width: `${barWidth}px`,
              }}
            ></div>
            <div className="bar-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Visualizer);
