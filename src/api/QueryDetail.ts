import client from "./Client";

const endPoint = "/query/";
const queryDetail = (id: string) => client.get(endPoint + id);

export { queryDetail };
