export const bubbleSort = (array) => {
  const animations = [];
  const len = array.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      animations.push([j, j + 1]); // Store the indices of the bars being compared
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return animations; // Return the animations
};
