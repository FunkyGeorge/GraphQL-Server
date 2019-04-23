import express from "express";
import config from "config";
import * as bp from "body-parser";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";

import { resolvers, typeDefs } from "./graphql/schema";

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
    __dirname + "/entity/*.js"
  ],
  synchronize: true
} as ConnectionOptions;

const app: express.Application = express();
app.use(bp.json());

createConnection(typeOrmConfig)
.then((connection: Connection) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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
  throw new Error("Can't connect to the database")
});
