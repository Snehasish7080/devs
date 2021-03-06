import { IUser } from "./User";

export interface IQueryReport {
  _id: string;
  title?: string;
  description?: string;
  queryId?: string;
  name?: string;
  price?: string;
  submittedBy?: IUser;
}
