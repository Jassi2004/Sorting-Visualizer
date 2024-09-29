import React, { useEffect, useState } from 'react';
import './Stars.css'; // Import the CSS for styling

const Stars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 50; i++) {
        // Fixed angle to move towards bottom left
        const angle = (Math.PI / 4); // 45 degrees downward to the left
        const distance = Math.random() * 100 + 100; // Distance between 100 and 200

        starArray.push({
          top: `${Math.random() * 100}vh`, // Random starting position from the top
          left: `${Math.random() * 100}vw`, // Random starting position from the left
          duration: `${Math.random() * 3 + 3}s`, // Duration between 3s and 6s
          delay: `${Math.random() * 5}s`, // Delay between 0s and 5s
          fallX: `${-distance * Math.cos(angle)}vw`, // Calculate horizontal distance (negative for left)
          fallY: `${distance * Math.sin(angle)}vh`, // Calculate vertical distance (positive for downward)
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div className="stars">
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.duration,
            animationDelay: star.delay,
            '--fall-distance-x': star.fallX,
            '--fall-distance-y': star.fallY,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Stars;
