import "./DrawActionBar.scss";

class DrawActionBar {
  /**
   * Create a new action bar and insert it into the DOM.
   * @param parent {HTMLElement} HTML element into which to insert component
   * @param options {string[]} List of options to display
   */
  public create(parent: HTMLElement, options: string[]): void {
    // Create component elements
    const component = document.createElement("div") as HTMLElement;
    component.className = "action-bar";

    const select = document.createElement("select") as HTMLSelectElement;
    select.id = "action-bar-select";

    options.forEach((text: string) => {
      const option = document.createElement("option") as HTMLOptionElement;
      option.value = text;
      option.text = text;
      select.appendChild(option);
    });

    const button = document.createElement("button") as HTMLButtonElement;
    button.id = "action-bar-button";
    button.appendChild(document.createTextNode("See your draw 🎁"));

    // Build component
    component.appendChild(select);
    component.appendChild(button);

    // Insert component into its parent
    parent.appendChild(component);
  }
}

export default new DrawActionBar();
