import { IQuery } from "../Interface/Query";
import client from "./Client";

const endPoint = "/comment/create";

const postComment = (values: FormData) => client.post(endPoint, values);

export { postComment };
