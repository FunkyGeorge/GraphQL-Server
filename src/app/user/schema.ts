import { gql } from "apollo-server-express";

export const userSchema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  extend type Query {
    getAllUsers: [User]
  }
`;
