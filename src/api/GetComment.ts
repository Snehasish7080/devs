import { IVerify } from "../Interface/VerifyAccount";
import client from "./Client";

const endPoint = "/comment/query-report/";
const getComment = (reportId: string) => client.get(endPoint + reportId);

export { getComment };
