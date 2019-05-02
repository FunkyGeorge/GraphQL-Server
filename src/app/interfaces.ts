import UserReader from "./user/reader";
import PlanReader from "./plan/reader";

export interface IDatasources {
  userReader: UserReader;
  planReader: PlanReader;
}