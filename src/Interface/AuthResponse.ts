import { IUser } from "./User";

export interface IAuthResponse {
  expiresIn: string;
  success: boolean;
  token: string;
  user: IUser;
}
