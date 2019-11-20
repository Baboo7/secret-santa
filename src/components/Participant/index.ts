import "./Participant.scss";

class Participant {
  /**
   * Create a new participant and insert it into the DOM.
   * @param parent {HTMLElement} HTML element into which to insert component
   * @param name {string} Name of the participant
   * @param spouseName {string | null} Name of the participant's spouse
   * @param isSelected {boolean} Whether the participant is selected
   */
  create(
    parent: HTMLElement,
    name: string,
    spouseName: string | null,
    isSelected: boolean,
  ): void {
    // Create component elements
    const component = document.createElement("div");
    const className = ["participant"];
    if (isSelected) className.push("selected");
    component.className = className.join(" ");

    const nameNode = document.createTextNode(name);

    let spouseNode;
    if (spouseName) {
      spouseNode = document.createElement("span");
      spouseNode.className = "spouse";
      spouseNode.appendChild(
        document.createTextNode(`(spouse: ${spouseName})`)
      );
    }

    // Build component
    component.appendChild(nameNode);
    if (spouseNode) component.appendChild(spouseNode);

    // Insert component into its parent
    parent.appendChild(component);
  }
}

export default new Participant();
