import { Plan } from "../../database/entity/Plan";
import PlanStore from "./store";

export default class PlanReader {
  constructor(private repository: PlanStore) { }

  public getAllPlans(): Promise<Plan[]> {
    return this.repository.getAllPlans();
  }
}
