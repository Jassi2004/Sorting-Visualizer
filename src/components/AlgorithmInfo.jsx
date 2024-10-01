import React from 'react';

const AlgorithmInfo = ({ algorithm, arraySize, timeTaken, isSorting }) => {
  const getTimeComplexity = (algo) => {
    switch (algo) {
      case 'Bubble Sort':
        return 'O(n²)';
      case 'Quick Sort':
        return 'O(n log n) on average, O(n²) worst case';
      case 'Merge Sort':
        return 'O(n log n)';
      default:
        return 'N/A';
    }
  };

  const getSpaceComplexity = (algo) => {
    switch (algo) {
      case 'Bubble Sort':
        return 'O(1)';
      case 'Quick Sort':
        return 'O(log n)';
      case 'Merge Sort':
        return 'O(n)';
      default:
        return 'N/A';
    }
  };

  const getComparison = (algo) => {
    switch (algo) {
      case "Bubble Sort":
        return 'Bubble Sort is simple but inefficient for large lists. Its mainly used for educational purposes.';
      case 'Quick Sort':
        return 'Quick Sort is generally faster than other O(n log n) algorithms. Its widely used but can be slow on already sorted arrays.';
      case 'Merge Sort':
        return 'Merge Sort is stable and predictable, always O(n log n). Its often used for external sorting.';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="algorithm-info" style={{
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        backdropFilter: "blur(5px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        padding: "1rem",
        // height: "100%",
        display: "flex",
        flexDirection: "column",    
      width: '60vw',
    //   padding: '20px',
    //   backgroundColor: '#1E1E1E',
      color: '#FFFFFF',
    //   borderRadius: '10px',
    //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      marginTop: '20px'
    }}>
      <h3>{algorithm} Information</h3>
      <p><strong>Array Size:</strong> {arraySize}</p>
      <p><strong>Time Taken:</strong> {isSorting ? 'Sorting...' : `${timeTaken.toFixed(2)} ms`}</p>
      <p><strong>Time Complexity:</strong> {getTimeComplexity(algorithm)}</p>
      <p><strong>Space Complexity:</strong> {getSpaceComplexity(algorithm)}</p>
      <p><strong>Comparison:</strong> {getComparison(algorithm)}</p>
    </div>
  );
};

export default React.memo(AlgorithmInfo);