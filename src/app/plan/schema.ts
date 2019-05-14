import { gql } from "apollo-server-express";

export const planSchema = gql`
  type Plan {
    id: ID!
    organizer: User!
    attendees: [User]!
  }

  extend type Query {
    getAllPlans: [Plan]
  }
`;
