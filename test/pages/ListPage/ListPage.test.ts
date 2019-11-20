import { ListPage } from "../../../src/pages";

describe("ListPage", () => {
  describe("handleParticipantClicked", () => {
    it("should select participant", () => {
      const participants: Map<string, string | null> = new Map();
      participants.set("someone", null);
      const listPage = new ListPage(participants, () => {});

      (listPage as any).renderParticipantsList = () => {};
      const handleParticipantClicked = (listPage as any)
        .handleParticipantClicked as (name: string) => void;

      handleParticipantClicked("someone");

      expect((listPage as any).selectedParticipant).toBe("someone");
      expect(participants.get("someone")).toBe(null);
    });

    it("should deselect participant", () => {
      const participants: Map<string, string | null> = new Map();
      participants.set("someone", null);
      const listPage = new ListPage(participants, () => {});

      (listPage as any).renderParticipantsList = () => {};
      const handleParticipantClicked = (listPage as any)
        .handleParticipantClicked as (name: string) => void;

      handleParticipantClicked("someone");
      handleParticipantClicked("someone");

      expect((listPage as any).selectedParticipant).toBe(null);
      expect(participants.get("someone")).toBe(null);
    });

    it("should set spouses", () => {
      const participants: Map<string, string | null> = new Map();
      participants.set("john", "jane");
      participants.set("jane", "john");
      participants.set("simon", "garfunkel");
      participants.set("garfunkel", "simon");
      const listPage = new ListPage(participants, () => {});

      (listPage as any).renderParticipantsList = () => {};
      const handleParticipantClicked = (listPage as any)
        .handleParticipantClicked as (name: string) => void;

      handleParticipantClicked("jane");
      handleParticipantClicked("simon");

      expect((listPage as any).selectedParticipant).toBe(null);
      expect(participants.get("john")).toBe(null);
      expect(participants.get("garfunkel")).toBe(null);
      expect(participants.get("jane")).toBe("simon");
      expect(participants.get("simon")).toBe("jane");
    });
  });
});
