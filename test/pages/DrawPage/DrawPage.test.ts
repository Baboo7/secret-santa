import { DrawPage } from "../../../src/pages";

jest.mock("../../../src/services/randomService", () => ({
  getRandomItem: <T>(arr: Array<T>) => arr[0]
}));

describe("DrawPage", () => {
  describe("buildDrawConstraintsGraph", () => {
    it("should build drawn constraints graph", () => {
      const participants: Map<string, string | null> = new Map();
      participants.set("a", "b");
      participants.set("b", "a");
      participants.set("c", null);
      const drawPage = new DrawPage(participants);

      const buildDrawConstraintsGraph = (drawPage as any)
        .buildDrawConstraintsGraph as () => [string, string[]][];

      const constraintsGraph = buildDrawConstraintsGraph();

      expect(constraintsGraph).toEqual([
        ["a", ["c"]],
        ["b", ["c"]],
        ["c", ["a", "b"]]
      ]);
    });
  });

  describe("buildDrawGraph", () => {
    it("should build draw graph", () => {
      const drawPage = new DrawPage(new Map());

      const buildDrawGraph = (drawPage as any).buildDrawGraph as (
        constraints: [string, string[]][]
      ) => Map<string, string>;

      const drawGraph = buildDrawGraph([
        ["a", ["b", "c"]],
        ["b", ["c", "a"]],
        ["c", ["a", "b"]]
      ]);

      expect(Array.from(drawGraph)).toEqual([
        ["a", "b"],
        ["b", "c"],
        ["c", "a"]
      ]);
    });
  });
});
