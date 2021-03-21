import client from "./Client";

const endPoint = "/profile/details";
const user = () => client.get(endPoint);

export { user };
