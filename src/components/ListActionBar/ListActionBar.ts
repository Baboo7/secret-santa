import "./ListActionBar.scss";

class ListActionBar {
  /**
   * Create a new action bar and insert it into the DOM.
   * @param parent {HTMLElement} HTML element into which to insert component
   */
  public create(parent: HTMLElement): void {
    // Create component elements
    const component = document.createElement("div") as HTMLElement;
    component.id = "action-bar";

    const input = document.createElement("input") as HTMLInputElement;
    input.id = "participant-input";
    input.placeholder = "Enter name of participant";

    const button = document.createElement("button") as HTMLButtonElement;
    button.id = "draw-button";
    button.appendChild(document.createTextNode("Draw"));

    // Build component
    component.appendChild(input);
    component.appendChild(button);

    // Insert component into its parent
    parent.appendChild(component);
  }
}

export default new ListActionBar();
