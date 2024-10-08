import * as bp from "body-parser";
import express from "express";
import { MainService } from "./services/MainService";

const app: express.Application = express();
app.use(bp.json());

const mainService = new MainService(app);
mainService.start();
