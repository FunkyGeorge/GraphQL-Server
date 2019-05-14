import { IDatasources } from "../interfaces";

const getAllPlans = (
  _: { _: any },
  __: { __: any },
  { dataSources }: { dataSources: IDatasources }
) => {
  return dataSources.planReader.getAllPlans();
};

export const planResolver = {
  Query: {
    getAllPlans
  }
};
