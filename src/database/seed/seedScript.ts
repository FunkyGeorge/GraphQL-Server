import config from "config";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { User } from "../entity/User";
import seedData from "./seedData";

interface ISeedUser {
  firstName: string;
  lastName: string;
  email: string;
}

interface ISeedData {
  users: ISeedUser[];
}

const data: ISeedData = seedData();

const dbConfig = config.get("dbConfig");
const typeOrmConfig: ConnectionOptions = {
  ...dbConfig,
  entities: [
    __dirname + "/../entity/*.js"
  ],
  synchronize: true
} as ConnectionOptions;

createConnection(typeOrmConfig)
.then((conn: Connection) => {
  const userRepository = conn.getRepository(User);

  // clear
  userRepository.delete({});

  // seed users
  const userData: ISeedUser[] = data.users;

  userData.forEach(async (seedUser: ISeedUser) => {
    const u = new User();
    u.firstName = seedUser.firstName;
    u.lastName = seedUser.lastName;
    u.email = seedUser.email;
    await userRepository.save(u);
  });
})
.catch((e) => {
  console.log(e);  // tslint:disable-line no-console
  return new Error("Error with seed");
});
