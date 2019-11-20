import "./style.scss";

import { ListPage } from "./pages";

/**
 * Holds participants.
 * - key: participant name
 * - value: spouse name
 */
const participants: Map<string, string | null> = new Map();

const listPage = new ListPage(participants);
listPage.build();
