import "./style.scss";

import { Participant } from "./components";

const participantInput = document.getElementById(
  "participant-input"
) as HTMLInputElement;
const participantsList = document.getElementById(
  "participants-list"
) as HTMLElement;

participantInput.addEventListener("keydown", (ev: KeyboardEvent) => {
  // On Enter key down
  if (ev.keyCode === 13) {
    const participantName = participantInput.value;
    Participant.create(participantsList, participantName);
    participantInput.value = "";
  }
});
