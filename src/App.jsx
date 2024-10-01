import { useState, useEffect, useCallback, useRef } from 'react';
import './styles/app.css';
import './components/Stars.css';
import TopBar from './components/TopBar';
import ControlPanel from './components/ControlPanel';
import Visualizer from './components/Visualizer';
import AlgorithmInfo from './components/AlgorithmInfo';
import DryRunSummary from './components/DryRunSummary';
import Stars from './components/Stars';
import { bubbleSort } from './algorithms/bubbleSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';
import { getDryRunSummary } from './services/geminiService';

const App = () => {
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showBars, setShowBars] = useState(true);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [arraySize, setArraySize] = useState(10);
  const [speed, setSpeed] = useState(500);
  const [array, setArray] = useState([]);
  const [comparisonIndices, setComparisonIndices] = useState([-1, -1]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [dryRunSummary, setDryRunSummary] = useState('');
  const [originalArray, setOriginalArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  
  const animationTimeouts = useRef([]);
  const animationFrame = useRef(0);
  const sortingStartTime = useRef(0);

  const generateRandomArray = useCallback(async (size) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setOriginalArray([...newArray]);
    setSortedArray([...newArray].sort((a, b) => a - b));
    const summary = await getDryRunSummary(algorithm, newArray);
    setDryRunSummary(summary);
  }, [algorithm]);

  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize, generateRandomArray]);

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

  const animateSorting = useCallback((animations, startIndex = 0) => {
    let i = startIndex;
    const animate = () => {
      if (i < animations.length && !isPaused) {
        const [barOneIndex, barTwoIndex] = animations[i];
        setComparisonIndices([barOneIndex, barTwoIndex]);
        setArray(prevArray => {
          const newArray = [...prevArray];
          if (newArray[barOneIndex] > newArray[barTwoIndex]) {
            [newArray[barOneIndex], newArray[barTwoIndex]] = [newArray[barTwoIndex], newArray[barOneIndex]];
          }
          return newArray;
        });
        i++;
        animationFrame.current = requestAnimationFrame(() => {
          setTimeout(animate, 1000 - speed);
        });
      } else if (i >= animations.length) {
        setArray(prev => [...prev].sort((a, b) => a - b));
        setIsSorting(false);
        setIsPaused(false);
        setComparisonIndices([-1, -1]);
        setTimeTaken(performance.now() - sortingStartTime.current);
      } else {
        animationFrame.current = i;
      }
    };
    animate();
  }, [speed, isPaused]);

  const startSorting = useCallback(async () => {
    if (isSorting) return;

    setIsSorting(true);
    setIsPaused(false);
    sortingStartTime.current = performance.now();
    const animations = getSortingAnimations(algorithm, array);
    animateSorting(animations);

    const summary = await getDryRunSummary(algorithm, array);
    setDryRunSummary(summary);
  }, [animateSorting, isSorting, algorithm, array]);

  const pauseSorting = () => {
    setIsPaused(true);
    cancelAnimationFrame(animationFrame.current);
  };

  const resumeSorting = () => {
    setIsPaused(false);
    const animations = getSortingAnimations(algorithm, array);
    animateSorting(animations, animationFrame.current);
  };

  const resetSorting = useCallback(() => {
    setIsSorting(false);
    setIsPaused(false);
    setShowBars(true);
    cancelAnimationFrame(animationFrame.current);
    animationTimeouts.current.forEach(clearTimeout);
    animationTimeouts.current = [];
    generateRandomArray(arraySize);
    setComparisonIndices([-1, -1]);
    setTimeTaken(0);
  }, [arraySize, generateRandomArray]);

  const handleArraySizeChange = (newSize) => {
    setArraySize(newSize);
    generateRandomArray(newSize);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const handleCustomArrayInput = async (customArray) => {
    setArray(customArray);
    setOriginalArray([...customArray]);
    setSortedArray([...customArray].sort((a, b) => a - b));
    setArraySize(customArray.length);
    const summary = await getDryRunSummary(algorithm, customArray);
    setDryRunSummary(summary);
  };

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
              onResume={resumeSorting}
              onReset={resetSorting}
              setArraySize={handleArraySizeChange}
              setSpeed={handleSpeedChange}
              isSorting={isSorting}
              isPaused={isPaused}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              arraySize={arraySize}
              speed={speed}
              onCustomArrayInput={handleCustomArrayInput}
            />
          </div>
          <div className="bottom-panel">
            <Visualizer
              showBars={showBars}
              array={array}
              algorithm={algorithm}
              speed={speed}
              comparisonIndices={comparisonIndices}
            />
            <AlgorithmInfo
              algorithm={algorithm}
              arraySize={arraySize}
              timeTaken={timeTaken}
              isSorting={isSorting}
            />
          </div>
        </div>
        <div className="right-container">
          <DryRunSummary 
            summary={dryRunSummary} 
            originalArray={originalArray}
            sortedArray={sortedArray}
          />
        </div>
      </div>
    </div>
  );
}

export default App;