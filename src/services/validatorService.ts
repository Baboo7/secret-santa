/**
 * Check if a string is blank.
 * @param str {string}
 * @returns True if blank, false otherwise.
 */
export const isStrBlank = (str: string): boolean => {
  return !str || str.length === 0 || /^\s*$/.test(str);
};
