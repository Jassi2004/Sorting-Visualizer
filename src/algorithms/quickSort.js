export const quickSort = (array) => {
  const animations = [];
  
  const quickSortHelper = (arr, start, end) => {
    if (start >= end) return;
    
    const pivotIndex = partition(arr, start, end);
    quickSortHelper(arr, start, pivotIndex - 1);
    quickSortHelper(arr, pivotIndex + 1, end);
  };

  const partition = (arr, start, end) => {
    const pivot = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      animations.push([i, end]); // Store the indices of the bars being compared
      if (arr[i] < pivot) {
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        pivotIndex++;
      }
    }

    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    return pivotIndex;
  };

  quickSortHelper(array, 0, array.length - 1);
  return animations; // Return the animations
};
