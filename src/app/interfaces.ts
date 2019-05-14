import PlanReader from "./plan/reader";
import UserReader from "./user/reader";
import UserWriter from "./user/writer";

export interface IDatasources {
  userReader: UserReader;
  planReader: PlanReader;
  userWriter: UserWriter;
}
