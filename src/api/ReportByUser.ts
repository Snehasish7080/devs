import client from "./Client";

const endPoint = "/query-report/user/id";
const getReportByUserId = () => client.get(endPoint);

export { getReportByUserId };
