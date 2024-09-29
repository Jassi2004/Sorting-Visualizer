export const mergeSort = (array) => {
  const animations = [];

  const mergeSortHelper = (arr, start, end) => {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(arr, start, mid);
    mergeSortHelper(arr, mid + 1, end);
    merge(arr, start, mid, end);
  };

  const merge = (arr, start, mid, end) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let k = start;
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      animations.push([start + i, mid + 1 + j]); // Store indices for comparison
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
    }

    while (i < left.length) {
      arr[k++] = left[i++];
    }
    while (j < right.length) {
      arr[k++] = right[j++];
    }
  };

  mergeSortHelper(array, 0, array.length - 1);
  return animations; // Return the animations
};
