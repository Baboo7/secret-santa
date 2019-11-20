import "./Participant.scss";

class Participant {
  /**
   * Create a new participant and insert it into the DOM.
   * @param parent {HTMLElement} HTML element into which to insert component
   * @param name {string} Name of the participant
   */
  create(parent: HTMLElement, name: string): void {
    // Create component elements
    const component = document.createElement("div");
    component.className = "participant";

    const nameNode = document.createTextNode(name);

    // Build component
    component.appendChild(nameNode);

    // Insert component into its parent
    parent.appendChild(component);
  }
}

export default new Participant();
