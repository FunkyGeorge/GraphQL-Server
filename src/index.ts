import express from "express";
import config from "config";
import * as bp from "body-parser";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";

import { resolvers, typeDefs } from "./graphql/schema";
import UserReader from "./app/user/reader";
import UserStore from "./app/user/store";
import UserWriter from "./app/user/writer";

interface IDBConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const PORT: string = process.env.PORT || "3000";
const GRAPHQL_ENDPOINT: string = "/graphql";
const dbConfig = config.get<IDBConfig>("dbConfig");
const typeOrmConfig: ConnectionOptions = {
  ...dbConfig,
  entities: [
    __dirname + "/database/entity/*.js"
  ],
  synchronize: true
} as ConnectionOptions;

const app: express.Application = express();
app.use(bp.json());

createConnection(typeOrmConfig)
.then((conn: Connection) => {
  const userStore = new UserStore(conn);
  const userReader = new UserReader(userStore);
  const userWriter = new UserWriter(userStore);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      userReader,
      userWriter
    } as any),
    introspection: true,
    playground: {
      settings: {
        'editor.theme': 'light',
      },
      tabs: [
        {
          endpoint: GRAPHQL_ENDPOINT
        }
      ],
    }
  });

  apolloServer.applyMiddleware({ app, path: GRAPHQL_ENDPOINT });

  app.listen(PORT, () => {
    console.log("listening on port:", PORT)
  });
})
.catch(e => {
  console.log(e);
  throw new Error("Can't connect to the database")
});
