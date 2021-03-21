import client from "./Client";

const endPoint = "/category/all";
const category = () => client.get(endPoint);

export { category };
