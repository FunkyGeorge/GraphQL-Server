import { gql } from "apollo-server-express";
import merge from "lodash.merge";
import { userSchema } from "../app/user/schema";
import { userResolver } from "../app/user/resolver";

const baseSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const typeDefs = [baseSchema, userSchema];
export const resolvers = merge({}, userResolver);