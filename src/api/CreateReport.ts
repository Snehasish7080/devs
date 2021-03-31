import { IQuery } from "../Interface/Query";
import client from "./Client";

const endPoint = "/query-report/create";

const createReport = (values: FormData) => client.post(endPoint, values);

export { createReport };
