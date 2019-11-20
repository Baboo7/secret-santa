import { isStrBlank } from "../../src/services/validatorService";

describe("validatorService", () => {
  describe("isStrBlank", () => {
    it("should detect blank string", () => {
      expect(isStrBlank("")).toBe(true);
      expect(isStrBlank("  ")).toBe(true);
      expect(isStrBlank("some string")).toBe(false);
    });
  });
});
