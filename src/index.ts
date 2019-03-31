import express from "express";
import * as bp from "body-parser";

const PORT = process.env.PORT || "3000";

const app: express.Application = express();
app.use(bp.json());

app.listen(() => {
  console.log("Server successfully running on port", PORT);
});