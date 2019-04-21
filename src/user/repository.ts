import { EntityRepository, Repository } from "typeorm"
import { User } from "../database/entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public createUserWithNames(firstName: string, lastName: string) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    this.save(user);
  }
} 