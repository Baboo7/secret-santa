/**
 * Generate a random integer.
 * @param start {number}
 * @param end {number} Not included
 * @returns {number}
 */
export const randInt = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start) + start);
};

/**
 * Get a random item from an array.
 * @param arr {Array}
 * @returns Item
 */
export const getRandomItem = <T>(arr: Array<T>): T => {
  return arr[randInt(0, arr.length)];
};
