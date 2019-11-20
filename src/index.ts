import "./style.scss";

import { DrawPage, ListPage } from "./pages";

/**
 * Holds participants.
 * - key: participant name
 * - value: spouse name
 */
const participants: Map<string, string | null> = new Map();

const navigateToDrawPage = (): void => {
  listPage.destroy();
  drawPage.build();
};

const drawPage = new DrawPage(participants);
const listPage = new ListPage(participants, navigateToDrawPage);

listPage.build();
