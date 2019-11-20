import "./ListPage.scss";

import { ListActionBar, Participant } from "../../components";
import { removeChildren } from "../../services/domService";
import { isStrBlank } from "../../services/validatorService";

class ListPage {
  private onButtonClick: () => void;
  private participantsList: HTMLElement | null;
  private participants: Map<string, string | null>;
  private selectedParticipant: string | null;

  constructor(
    participants: Map<string, string | null>,
    onButtonClick: () => void
  ) {
    this.onButtonClick = onButtonClick;
    this.participants = participants;
    this.participantsList = null;
    this.selectedParticipant = null;
  }

  /**
   * Destroy the page.
   */
  public destroy(): void {
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

    this.participantsList = document.createElement("div") as HTMLElement;
    this.participantsList.id = "participants-list";

    const app = document.getElementById("app") as HTMLElement;
    app.appendChild(title);
    ListActionBar.create(app, this.onButtonClick, this.onParticipantEntered);
    app.appendChild(this.participantsList);
  }

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
   * Handle enter of a new participant.
   * @param participant {string} Name of the participant
   */
  private onParticipantEntered = (participant: string): void => {
    if (this.participants.has(participant) || isStrBlank(participant)) {
      return;
    }

    this.participants.set(participant, null);
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
