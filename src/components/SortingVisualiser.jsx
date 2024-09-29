import React, { useState } from 'react';
import ControlPanel from './ControlPanel';

const SortingVisualizer = () => {
  const [array, setArray] = useState([...Array(10).keys()].map(x => Math.floor(Math.random() * 100)));
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');

  const handleStart = (selectedAlgorithm, arraySize, speed) => {
    setIsSorting(true);
    let newArray = [...array];

    const sortAlgorithms = {
      'Bubble Sort': () => bubbleSort(newArray, speed),
      'Quick Sort': () => quickSort(newArray, speed),
      'Merge Sort': () => mergeSort(newArray, speed),
    };

    if (sortAlgorithms[selectedAlgorithm]) {
      sortAlgorithms[selectedAlgorithm]();
    }

    // After sorting is done
    setIsSorting(false);
    setArray(newArray);
  };

  const bubbleSort = (array, speed) => {
    // Implement bubble sort logic with animation delay
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        setTimeout(() => {
          // Visualization logic (update state to show the array changes)
          // For example, you can call setArray([...array]) after swapping elements
        }, j * speed);
      }
    }
  };

  // Placeholder for other sorting functions (quickSort, mergeSort)

  const handlePause = () => {
    setIsSorting(false);
  };

  const handleReset = () => {
    setArray([...Array(10).keys()].map(x => Math.floor(Math.random() * 100))); // Reset to a new random array
    setIsSorting(false);
  };

  return (
    <div>
      <ControlPanel 
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        setArraySize={size => console.log(size)} // Update array size if needed
        setSpeed={speed => console.log(speed)} // Update speed if needed
        isSorting={isSorting}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />
      <div>
        {/* Render the array here (for example as a series of divs) */}
        {array.map((value, index) => (
          <div key={index} style={{ height: value * 3, width: '20px', backgroundColor: 'blue', margin: '2px' }}></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
