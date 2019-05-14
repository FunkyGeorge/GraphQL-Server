import { User } from "../../database/entity/User";
import UserStore from "./store";

export default class UserReader {
  constructor(private repository: UserStore) { }

  public getAllUsers(): Promise<User[]> {
    return this.repository.getAllUsers();
  }
}
