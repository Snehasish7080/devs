import { ISignUp } from "../Interface/SignUp";
import client from "./Client";

const endPoint = "/register/signup";
const signUp = ({ email, username, password }: ISignUp) =>
  client.post(endPoint, {
    email: email,
    password: password,
    username: username,
  });

export { signUp };
