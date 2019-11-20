import "./style.scss";

import { Participant } from "./components";
import { isStrBlank } from "./services/validatorService";
import { removeChildren } from "./services/domService";

/**
 * Holds participants.
 * - key: participant name
 * - value: spouse name
 */
const participants: Map<string, string | null> = new Map();
let selectedParticipant: string | null = null;

const participantInput = document.getElementById(
  "participant-input"
) as HTMLInputElement;
const participantsList = document.getElementById(
  "participants-list"
) as HTMLElement;

participantInput.addEventListener("keydown", (ev: KeyboardEvent) => {
  // On Enter key down
  if (ev.keyCode === 13) {
    const participantName = participantInput.value.trim();
    if (participants.has(participantName) || isStrBlank(participantName)) {
      return;
    }

    participants.set(participantName, null);
    participantInput.value = "";
    renderParticipantList();
  }
});

const renderParticipantList = (): void => {
  removeChildren(participantsList);
  participants.forEach((spouseName: string | null, participantName: string) => {
    const isSelected = selectedParticipant === participantName;

    Participant.create(
      participantsList,
      participantName,
      spouseName,
      isSelected,
      handleParticipantClicked
    );
  });
};

const handleParticipantClicked = (name: string): void => {
  if (selectedParticipant === null) {
    selectedParticipant = name;
  } else if (selectedParticipant === name) {
    selectedParticipant = null;
  } else {
    // Remove old spouses
    const selectedParticipantSpouse = participants.get(selectedParticipant);
    if (selectedParticipantSpouse)
      participants.set(selectedParticipantSpouse, null);
    const nameSpouse = participants.get(name);
    if (nameSpouse) participants.set(nameSpouse, null);

    // Set new spouses
    participants.set(selectedParticipant, name);
    participants.set(name, selectedParticipant);
    selectedParticipant = null;
  }

  renderParticipantList();
};
