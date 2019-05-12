import express from "express";
import config from "config";
import * as http from "http";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";

import { resolvers, typeDefs } from "../graphql/schema";
import PlanReader from "../app/plan/reader";
import PlanStore from "../app/plan/store";
import UserReader from "../app/user/reader";
import UserStore from "../app/user/store";
import UserWriter from "../app/user/writer";

interface IDBConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class MainService {
  private connection: Connection;
  private readonly PORT: string = process.env.PORT || "3000";
  private readonly GRAPHQL_ENDPOINT: string = "/graphql";
  private readonly typeOrmConfig: ConnectionOptions;
  private expressServer: http.Server;

  constructor(private app: express.Application) {
    const dbConfig = config.get<IDBConfig>("dbConfig");
    this.typeOrmConfig = {
      ...dbConfig,
      entities: [
        __dirname + "/../database/entity/*.js"
      ],
      synchronize: true
    } as ConnectionOptions;
  }

  private async init() {
    this.connection = await createConnection(this.typeOrmConfig);

    try {
      const planStore = new PlanStore(this.connection);
      const userStore = new UserStore(this.connection);
      const planReader = new PlanReader(planStore);
      const userReader = new UserReader(userStore);
      const userWriter = new UserWriter(userStore);

      const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
          planReader,
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
              endpoint: this.GRAPHQL_ENDPOINT
            }
          ],
        }
      });

      apolloServer.applyMiddleware({
        app: this.app,
        path: this.GRAPHQL_ENDPOINT
      });

    } catch (e) {
      console.log(e);
      throw new Error("Can't connect to the database")
    };
  }

  public async start() {
    await this.init();
    this.expressServer = this.app.listen(this.PORT, () => {
      console.log("listening on port:", this.PORT)
    });
  }

  public async shutdown(): Promise<void> {
    if (this.expressServer) {
      this.expressServer.close();
    }
    return Promise.resolve();
  }
}