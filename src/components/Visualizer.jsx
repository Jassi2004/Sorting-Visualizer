import React, { useRef, useEffect, useState } from "react";

const Visualizer = ({ array, comparisonIndices }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const visualizerRef = useRef(null);
  const maxValue = Math.max(...array);

  useEffect(() => {
    const updateWidth = () => {
      if (visualizerRef.current) {
        setContainerWidth(visualizerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const barWidth = Math.max(2, (containerWidth / array.length) - 1);
  const showValue = barWidth >= 20;

  return (
    <div className="visualizer-container" ref={visualizerRef} style={{ width: '60vw', height: '300px' }}>
      <div className="visualizer" style={{ display: 'flex', alignItems: 'flex-end', height: '100%', maxWidth: '100%', overflow: 'hidden' }}>
        {array.map((value, index) => (
          <div 
            key={index} 
            className="bar-container" 
            style={{
              width: `${barWidth}px`,
              marginRight: '1px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              id={`bar-${index}`}
              className="bar"
              style={{
                height: `${(value / maxValue) * 100}%`,
                width: '100%',
                backgroundColor: comparisonIndices.includes(index) ? '#FF4136' : '#C6FF00',
                transition: 'height 0.2s ease, background-color 0.2s ease',
                background: comparisonIndices.includes(index) 
                  ? 'linear-gradient(145deg, #FF4136, #FF851B)'
                  : 'linear-gradient(145deg, #C6FF00, #00FF88)',
                boxShadow: '0 4px 8px rgba(0, 255, 136, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                borderRadius: '5px',
                transform: 'translateZ(0) scaleY(1)',
              }}
            ></div>
            {showValue && (
              <div className="bar-value" style={{ fontSize: '10px', marginTop: '2px', color: '#fff' }}>
                {value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Visualizer);