import { ILogin } from "../Interface/Login";
import client from "./Client";

const endPoint = "/register/login";
const login = ({ email, password }: ILogin) =>
  client.post(endPoint, { email: email, password: password });

export { login };
