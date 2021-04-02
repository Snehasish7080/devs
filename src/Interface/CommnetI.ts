import { IMedia } from "./IMedia";
import { MediaI } from "./MediaI";
import { IUser } from "./User";

export interface CommentI {
  _id: string;
  isOwner: boolean;
  text: string;
  mediaId?: IMedia;
  commentedBy: IUser;
}
