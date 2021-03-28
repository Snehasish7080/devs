import { IVerify } from "../Interface/VerifyAccount";
import client from "./Client";

const endPoint = "/query/picked-by/";
const picked = (queryId: string) => client.put(endPoint + queryId);

export { picked };
