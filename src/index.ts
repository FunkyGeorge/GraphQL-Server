import * as express from "express";
import * as bp from "body-parser";
import { Connection, createConnection } from "typeorm";
import { ApolloServer, gql } from "apollo-server-express";
import * as query from "qs-middleware"

const PORT: string = process.env.PORT || "3000";

const app: express.Application = express();
app.use(bp.json());

// GraphQL stuff
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World'
  }
}

createConnection({
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
          endpoint: '/graphiql'
        }
      ],
    }
  });
  const path: string = '/graphql'

  app.use(query());
  apolloServer.applyMiddleware({ app, path });

  app.listen(PORT, () => {
    console.log("listening on port:", PORT)
  });
})
.catch(e => {
  throw new Error("Error connecting to the database")
});
