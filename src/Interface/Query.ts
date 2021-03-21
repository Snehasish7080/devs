import { IMedia } from "./IMedia";

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
}
