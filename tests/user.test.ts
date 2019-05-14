import { MainService } from "../src/services/MainService";
const bp = require("body-parser");
const express = require("express");

describe("User tests", () => {

  let mainService: MainService;
  let users;
  beforeAll(async () => {
    users = require("../src/database/seed/seedData").users;
    require("../src/database/seed/seedScript");
    const app = express();
    app.use(bp.json());
    mainService = new MainService(app);
    await mainService.start();
  });

  afterAll(async () => {
    await mainService.shutdown();
  });

  it("can get user list", async () => {
    const usersResponse = await mainService.dataSources.userReader.getAllUsers();
    expect(usersResponse.length).toBe(users.length);
  });
});
