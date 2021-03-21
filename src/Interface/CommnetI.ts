import { MediaI } from "./MediaI";

export interface CommentI {
  id: string;
  isOwner: boolean;
  message: string;
  media: MediaI[];
}
