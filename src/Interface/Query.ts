import { IMedia } from "./IMedia";
import { IUser } from "./User";

export interface IQuery {
  _id: string;
  title: string;
  amount: number;
  description: string;
  responseTime: string;
  triageTime: string;
  categoryID?: string[];
  status?: string;
  qImages?: File[] | File;
  mediaID?: IMedia;
  postedBy: IUser;
  pickedBy: IUser;
  answeredBy: IUser;
}
