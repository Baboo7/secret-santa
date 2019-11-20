import "./ListPage.scss";

import { Participant } from "../../components";
import { removeChildren } from "../../services/domService";
import { isStrBlank } from "../../services/validatorService";

class ListPage {
  private participantInput: HTMLInputElement | null;
  private participantsList: HTMLElement | null;
  private participants: Map<string, string | null>;
  private selectedParticipant: string | null;

  constructor(participants: Map<string, string | null>) {
    this.participants = participants;
    this.participantInput = null;
    this.participantsList = null;
    this.selectedParticipant = null;
  }

  /**
   * Destroy the page.
   */
  public destroy(): void {
    this.participantInput!.removeEventListener("keydown", this.handleKeyDown);
    this.participantInput = null;
    this.participantsList = null;
    const app = document.getElementById("app") as HTMLElement;
    removeChildren(app);
  }

  /**
   * Build the page.
   */
  public build(): void {
    const title = document.createElement("h1");
    title.appendChild(document.createTextNode("Secret Santa"));

    this.participantInput = document.createElement("input") as HTMLInputElement;
    this.participantInput.id = "participant-input";
    this.participantInput.placeholder = "Enter name of participant";
    this.participantInput.addEventListener("keydown", this.handleKeyDown);

    this.participantsList = document.createElement("div") as HTMLElement;
    this.participantsList.id = "participants-list";

    const app = document.getElementById("app") as HTMLElement;
    app.appendChild(title);
    app.appendChild(this.participantInput);
    app.appendChild(this.participantsList);
  }

  /**
   * Handle key down on input.
   * @param ev {KeyboardEvent}
   */
  private handleKeyDown = (ev: KeyboardEvent): void => {
    // On Enter key down
    if (ev.keyCode === 13) {
      const participantName = this.participantInput!.value.trim();
      if (
        this.participants.has(participantName) ||
        isStrBlank(participantName)
      ) {
        return;
      }

      this.participants.set(participantName, null);
      this.participantInput!.value = "";
      this.renderParticipantsList();
    }
  };

  /**
   * Handle click on participant.
   * @param name {string} Name of the participant
   */
  private handleParticipantClicked = (name: string): void => {
    if (this.selectedParticipant === null) {
      this.selectedParticipant = name;
    } else if (this.selectedParticipant === name) {
      this.selectedParticipant = null;
    } else {
      // Remove old spouses
      const selectedParticipantSpouse = this.participants.get(
        this.selectedParticipant
      );
      if (selectedParticipantSpouse)
        this.participants.set(selectedParticipantSpouse, null);
      const nameSpouse = this.participants.get(name);
      if (nameSpouse) this.participants.set(nameSpouse, null);

      // Set new spouses
      this.participants.set(this.selectedParticipant, name);
      this.participants.set(name, this.selectedParticipant);
      this.selectedParticipant = null;
    }

    this.renderParticipantsList();
  };

  /**
   * Render the list of participants.
   */
  private renderParticipantsList = (): void => {
    removeChildren(this.participantsList!);
    this.participants.forEach(
      (spouseName: string | null, participantName: string) => {
        const isSelected = this.selectedParticipant === participantName;

        Participant.create(
          this.participantsList!,
          participantName,
          spouseName,
          isSelected,
          this.handleParticipantClicked
        );
      }
    );
  };
}

export default ListPage;
