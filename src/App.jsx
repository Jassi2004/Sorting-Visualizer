import React, { useState, useEffect, useCallback } from 'react';
import './styles/app.css';
import './components/Stars.css';
import TopBar from './components/TopBar';
import ControlPanel from './components/ControlPanel';
import Visualizer from './components/Visualizer';
import Stars from './components/Stars';
import { bubbleSort } from './algorithms/bubbleSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';

const App = () => {
  const [isSorting, setIsSorting] = useState(false);
  const [showBars, setShowBars] = useState(true);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [arraySize, setArraySize] = useState(10);
  const [speed, setSpeed] = useState(500);
  const [array, setArray] = useState([]);

  const generateRandomArray = useCallback((size) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  }, []);

  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize, generateRandomArray]);

  const startSorting = useCallback((selectedAlgorithm, selectedArraySize, selectedSpeed) => {
    if (isSorting) return;

    setAlgorithm(selectedAlgorithm);
    setArraySize(selectedArraySize);
    setSpeed(selectedSpeed);
    setIsSorting(true);
    setShowBars(false); // Hide bars when sorting starts

    // Generate a new random array for sorting
    const newArray = Array.from({ length: selectedArraySize }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray); // Set the new array to state

    const animations = getSortingAnimations(selectedAlgorithm, newArray);
    animateSorting(animations);
  }, [isSorting]);

  const getSortingAnimations = (selectedAlgorithm, arr) => {
    switch (selectedAlgorithm) {
      case 'Bubble Sort':
        return bubbleSort([...arr]);
      case 'Quick Sort':
        return quickSort([...arr]);
      case 'Merge Sort':
        return mergeSort([...arr]);
      default:
        return [];
    }
  };

  const animateSorting = useCallback((animations) => {
    const newArray = [...array]; // Copy the current state

    animations.forEach(([barOneIndex, barTwoIndex], i) => {
      setTimeout(() => {
        // Swap the bars visually
        [newArray[barOneIndex], newArray[barTwoIndex]] = [newArray[barTwoIndex], newArray[barOneIndex]];
        setArray([...newArray]); // Update state with the new array
      }, i * speed);
    });

    setTimeout(() => {
      setArray(prev => [...prev].sort((a, b) => a - b)); // Final sorted state
      setIsSorting(false);
      setShowBars(true); // Show bars when sorting is complete
    }, animations.length * speed + 100);
  }, [speed, array]);

  const pauseSorting = () => {
    setIsSorting(false);
    setShowBars(true); // Show bars when sorting is paused
    // Implement actual pause logic here if needed
  };

  const resetSorting = useCallback(() => {
    setIsSorting(false);
    setShowBars(true); // Show bars when reset
    generateRandomArray(arraySize);
  }, [arraySize, generateRandomArray]);

  return (
    <div className="app">
      <Stars />
      <TopBar />
      <div className="main-container">
        <div className="left-container">
          <div className="top-panel">
            <ControlPanel 
              onStart={startSorting} 
              onPause={pauseSorting} 
              onReset={resetSorting} 
              setArraySize={setArraySize}
              setSpeed={setSpeed}
              isSorting={isSorting}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
            />
          </div>
          <div className="bottom-panel">
            <Visualizer 
              showBars={showBars}
              array={array}
              algorithm={algorithm}
              speed={speed} 
            />
          </div>
        </div>
        <div className="right-container">
          <h2>Summary Section</h2>
          <p>This space will be used for summarization.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
