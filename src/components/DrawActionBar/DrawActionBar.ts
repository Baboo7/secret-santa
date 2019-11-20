import "./DrawActionBar.scss";

class DrawActionBar {
  /**
   * Create a new action bar and insert it into the DOM.
   * @param parent {HTMLElement} HTML element into which to insert component
   * @param options {string[]} List of options to display
   * @param onButtonClick {Function}
   * @param onParticipantSelected {Function}
   */
  public create(
    parent: HTMLElement,
    options: string[],
    onButtonClick: () => void,
    onParticipantSelected: (participant: string) => void
  ): void {
    // Create component elements
    const component = document.createElement("div") as HTMLElement;
    component.className = "action-bar";

    const select = document.createElement("select") as HTMLSelectElement;
    select.onchange = () => {
      const participant = select.options[select.selectedIndex].value;
      onParticipantSelected(participant);
    };

    options.forEach((text: string) => {
      const option = document.createElement("option") as HTMLOptionElement;
      option.value = text;
      option.text = text;
      select.appendChild(option);
    });

    const button = document.createElement("button") as HTMLButtonElement;
    button.appendChild(document.createTextNode("See your draw 🎁"));
    button.onclick = onButtonClick;

    // Build component
    component.appendChild(select);
    component.appendChild(button);

    // Insert component into its parent
    parent.appendChild(component);
  }
}

export default new DrawActionBar();
