import { gql } from "apollo-server-express";
import merge from "lodash.merge";
import { planResolver } from "../app/plan/resolver";
import { planSchema } from "../app/plan/schema";
import { userResolver } from "../app/user/resolver";
import { userSchema } from "../app/user/schema";

const baseSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const typeDefs = [baseSchema, userSchema, planSchema];
export const resolvers = merge({}, planResolver, userResolver);
