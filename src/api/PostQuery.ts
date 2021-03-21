import { IQuery } from "../Interface/Query";
import client from "./Client";

const endPoint = "/query/create";

const postQuery = (values: FormData) => client.post(endPoint, values);

export { postQuery };
