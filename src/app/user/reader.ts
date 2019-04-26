import UserStore from "./store";
import { User } from "../../database/entity/User";

export default class UserReader {
  constructor(private repository: UserStore) { }

  public getAllUsers(): Promise<User[]> {
    return this.repository.getAllUsers();
  }
}