import client from "./Client";

const endPoint = "/profile/public/details";
const publicProfile = (userName: string) => client.post(endPoint, { userName });

export { publicProfile };
