import { ApolloServer } from "apollo-server-express";
import config from "config";
import express from "express";
import * as http from "http";
import { Connection, ConnectionOptions, createConnection } from "typeorm";

import PlanReader from "../app/plan/reader";
import PlanStore from "../app/plan/store";
import UserReader from "../app/user/reader";
import UserStore from "../app/user/store";
import UserWriter from "../app/user/writer";
import { resolvers, typeDefs } from "../graphql/schema";

import { IDatasources } from "../app/interfaces";

interface IDBConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class MainService {
  public dataSources: IDatasources;
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

  public async start() {
    await this.init();
    this.expressServer = this.app.listen(this.PORT, () => {
      console.log("listening on port:", this.PORT);
    });
  }

  public async shutdown(): Promise<void> {
    if (this.expressServer) {
      this.expressServer.close();
    }
    return Promise.resolve();
  }

  private async init() {
    this.connection = await createConnection(this.typeOrmConfig);

    try {
      const planStore = new PlanStore(this.connection);
      const userStore = new UserStore(this.connection);
      this.dataSources = {
        planReader: new PlanReader(planStore),
        userReader: new UserReader(userStore),
        userWriter: new UserWriter(userStore)
      };

      const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => this.dataSources as any,
        introspection: true,
        playground: {
          settings: {
            "editor.theme": "light",
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
      throw new Error("Can't connect to the database");
    }
  }
}
