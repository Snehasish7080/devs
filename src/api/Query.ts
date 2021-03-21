import client from "./Client";

const endPoint = "/query/all";
const queries = () => client.get(endPoint);

export { queries };
