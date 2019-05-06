
beforeAll(() => {
  require("../src/database/seed/seedData");
});

describe("User tests", () => {
  it("passes control test", () => {
    expect(true).toBe(true)
  })
});