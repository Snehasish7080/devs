import { IVerify } from "../Interface/VerifyAccount";
import client from "./Client";

const endPoint = "/register/activation-account";
const verifyAccount = ({ email, otp }: IVerify) =>
  client.post(endPoint, { email: email, otp: otp });

export { verifyAccount };
