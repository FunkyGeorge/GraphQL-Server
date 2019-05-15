import * as bp from "body-parser";
import express from "express";
import seedData from "../src/database/seed/seedData";
import { MainService } from "../src/services/MainService";

describe("User tests", () => {

  let mainService: MainService;
  const users = seedData().users;
  beforeAll(async () => {
    await require("../src/database/seed/seedScript");
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
