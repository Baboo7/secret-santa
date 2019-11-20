import "./DrawPage.scss";

import { Draw, DrawActionBar } from "../../components";
import { removeChildren } from "../../services/domService";
import { getRandomItem } from "../../services/randomService";

type ConstraintsGraphType = [string, string[]][];
type DrawGraphType = Map<string, string>;

class DrawPage {
  private displayDraw: boolean;
  private drawGraph: DrawGraphType;
  private participants: Map<string, string | null>;
  private selectedParticipant: string | null;

  constructor(participants: Map<string, string | null>) {
    this.displayDraw = false;
    this.drawGraph = new Map();
    this.participants = participants;
    this.selectedParticipant = null;
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
    this.draw();

    const title = document.createElement("h1");
    title.appendChild(document.createTextNode("Draw"));

    const app = document.getElementById("app") as HTMLElement;
    app.appendChild(title);
    if (this.displayDraw) {
      Draw.create(app, "John", "Jane", this.toggleDrawDisplay);
    } else {
      const options = Array.from(this.drawGraph.keys());
      DrawActionBar.create(app, options, this.toggleDrawDisplay);
    }
  }

  /**
   * Build the draw constraints graph.
   * @returns {ConstraintsGraphType}
   */
  private buildDrawConstraintsGraph = (): ConstraintsGraphType => {
    const participantsNames = Array.from(this.participants.keys());

    const constraintsGraph: Map<string, string[]> = new Map();
    this.participants.forEach(
      (spouseName: string | null, participantName: string) => {
        const receivers = participantsNames.filter(
          (receiver: string) =>
            receiver !== participantName && receiver !== spouseName && receiver
        );
        constraintsGraph.set(participantName, receivers);
      }
    );

    return Array.from(constraintsGraph);
  };

  /**
   * Build the draw graph.
   * @param constraintsGraph {ConstraintsGraphType}
   * @returns {DrawGraphType}
   */
  private buildDrawGraph = (
    constraintsGraph: ConstraintsGraphType
  ): DrawGraphType => {
    const drawGraph: DrawGraphType = new Map();

    constraintsGraph.forEach(([participant, receivers]: [string, string[]]) => {
      // Remove drawn receivers from receivers list
      const drawnReceivers = Array.from(drawGraph.values());
      const filteredReceivers = receivers.filter(
        (receiver: string) => drawnReceivers.indexOf(receiver) < 0
      );

      // Pick receiver
      const receiver = getRandomItem(filteredReceivers);
      drawGraph.set(participant, receiver);
    });

    return drawGraph;
  };

  /**
   * Draw.
   */
  private draw = (): void => {
    const constraintsGraph: ConstraintsGraphType = this.buildDrawConstraintsGraph();
    this.drawGraph = this.buildDrawGraph(constraintsGraph);
  };

  /**
   * Toggle the display of the draw.
   */
  private toggleDrawDisplay = (): void => {
    this.displayDraw = !this.displayDraw;

    // Rerender page
    this.destroy();
    this.build();
  };
}

export default DrawPage;
