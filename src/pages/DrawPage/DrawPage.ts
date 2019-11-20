import "./DrawPage.scss";

import { removeChildren } from "../../services/domService";

class DrawPage {
  private participants: Map<string, string | null>;

  constructor(participants: Map<string, string | null>) {
    this.participants = participants;
  }

  /**
   * Destroy the page.
   */
  public destroy(): void {
    const app = document.getElementById("app") as HTMLElement;
    removeChildren(app);
  }

  /**
   * Build the page.
   */
  public build(): void {
    const title = document.createElement("h1");
    title.appendChild(document.createTextNode("Draw"));

    const app = document.getElementById("app") as HTMLElement;
    app.appendChild(title);
  }
}

export default DrawPage;
