import * as express from "express";
import * as bp from "body-parser";
import {createConnection} from "typeorm";

const PORT = process.env.PORT || "3000";

const app: express.Application = express();
app.use(bp.json());

class MainService {
  private connection;
  constructor(private app: express.Application) { }

  public async init() {
    try {
      this.connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "dbuser",
        password: "dbpassword",
        database: "postgres",
        entities: [
            __dirname + "/entity/*.js"
        ],
        synchronize: true,
      })
    } catch (e) {
      // TODO: throw error here
      console.log("Database connection error", e);
    }
  }

  public listen(cb: Function) {
    this.app.listen(cb)
  }
}

const mainService = new MainService(app);

mainService.listen(() => {
  console.log("Server successfully running on port", PORT);
});