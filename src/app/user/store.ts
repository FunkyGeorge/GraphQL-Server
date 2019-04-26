import { Connection, Repository } from "typeorm";
import { User } from "../../database/entity/User";

export default class UserStore {
  private userConn: Repository<User>;
  constructor(conn: Connection) {
    this.userConn = conn.getRepository(User);
  }

  public getAllUsers() {
    return this.userConn
      .createQueryBuilder("user")
      .getMany();
  }
}