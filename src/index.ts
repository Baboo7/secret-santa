import "./style.scss";

import { Participant } from "./components";
import { isStrBlank } from "./services/validatorService";

/**
 * Holds participants.
 * - key: participant name
 * - value: spouse name
 */
const participants: Map<string, string | null> = new Map();

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
    Participant.create(participantsList, participantName);
    participantInput.value = "";
  }
});
