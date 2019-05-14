import { Connection, Repository } from "typeorm";
import { Plan } from "../../database/entity/Plan";

export default class PlanStore {
  private planConn: Repository<Plan>;
  constructor(conn: Connection) {
    this.planConn = conn.getRepository(Plan);
  }

  public getAllPlans() {
    return this.planConn
      .createQueryBuilder("plan")
      .getMany();
  }
}
