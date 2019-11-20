/**
 * Remove children of a HTML element.
 * @param element {HTMLElement}
 */
export const removeChildren = (element: HTMLElement): void => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
