import UserReader from "./user/reader";
import PlanReader from "./plan/reader";
import UserWriter from "./user/writer";

export interface IDatasources {
  userReader: UserReader;
  planReader: PlanReader;
  userWriter: UserWriter;
}