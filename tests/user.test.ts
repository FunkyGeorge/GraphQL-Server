import { MainService } from "../src/services/MainService";
const bp = require("body-parser");
const express = require("express");

describe("Unit tests", () => {

  let mainService: MainService;
  beforeAll(async () => {
    require("../src/database/seed/seedData");
    const app = express();
    app.use(bp.json());
    mainService = new MainService(app);
    await mainService.start();
  });

  afterAll(() => {
    mainService.shutdown();
  });

  it("passes control test", () => {
    expect(true).toBe(true)
  })
});