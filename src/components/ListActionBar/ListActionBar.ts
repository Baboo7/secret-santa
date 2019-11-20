import "./ListActionBar.scss";

class ListActionBar {
  /**
   * Create a new action bar and insert it into the DOM.
   * @param parent {HTMLElement} HTML element into which to insert component
   * @param onButtonClicked {Function}
   * @param onParticipantEntered {Function}
   */
  public create(
    parent: HTMLElement,
    onButtonClicked: () => void,
    onParticipantEntered: (input: string) => void
  ): void {
    // Create component elements
    const component = document.createElement("div") as HTMLElement;
    component.className = "action-bar";

    const input = document.createElement("input") as HTMLInputElement;
    input.id = "participant-input";
    input.placeholder = "Enter name of participant";
    input.onkeydown = (ev: KeyboardEvent) => {
      // On Enter key down
      if (ev.keyCode === 13) {
        onParticipantEntered(input.value);
        input.value = "";
      }
    };

    const button = document.createElement("button") as HTMLButtonElement;
    button.appendChild(document.createTextNode("Draw"));
    button.onclick = onButtonClicked;

    // Build component
    component.appendChild(input);
    component.appendChild(button);

    // Insert component into its parent
    parent.appendChild(component);
  }
}

export default new ListActionBar();
