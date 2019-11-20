import "./Draw.scss";

class Draw {
  /**
   * Create a draw and insert it into the DOM.
   * @param parent {HTMLElement} HTML element into which to insert component
   * @param participant {string} Name of the participant
   * @param receiver {string} Name of the participant's receiver
   * @param onButtonClick {Function}
   */
  public create(
    parent: HTMLElement,
    participant: string,
    receiver: string,
    onButtonClick: () => void
  ): void {
    // Create component elements
    const component = document.createElement("div") as HTMLElement;
    component.className = "action-bar";

    const div = document.createElement("div") as HTMLDivElement;
    div.className = "draw-div";

    const participantSpan = document.createElement("span") as HTMLSpanElement;
    participantSpan.className = "bold";
    participantSpan.appendChild(document.createTextNode(participant));

    const receiverSpan = document.createElement("span") as HTMLSpanElement;
    receiverSpan.className = "bold";
    receiverSpan.appendChild(document.createTextNode(receiver));

    div.appendChild(participantSpan);
    div.appendChild(document.createTextNode("you have drawn"));
    div.appendChild(receiverSpan);

    const button = document.createElement("button") as HTMLButtonElement;
    button.id = "draw-button";
    button.appendChild(document.createTextNode("Hide your draw"));
    button.onclick = onButtonClick;

    // Build component
    component.appendChild(div);
    component.appendChild(button);

    // Insert component into its parent
    parent.appendChild(component);
  }
}

export default new Draw();
