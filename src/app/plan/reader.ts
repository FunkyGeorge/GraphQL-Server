import PlanStore from "./store";
import { Plan } from "../../database/entity/Plan";

export default class PlanReader {
  constructor(private repository: PlanStore) { }

  public getAllPlans(): Promise<Plan[]> {
    return this.repository.getAllPlans();
  }
}