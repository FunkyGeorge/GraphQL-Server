import { IDatasources } from "../interfaces";

const getAllUsers = (
  _: { _: any },
  __: { __: any },
  { dataSources }: { dataSources: IDatasources }
) => {
  return dataSources.userReader.getAllUsers();
};

export const userResolver = {
  Query: {
    getAllUsers
  }
};
