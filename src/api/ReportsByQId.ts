import client from "./Client";

const endPoint = "/query-report/query/";
const getReportByQueryId = (id: string) => client.get(endPoint + id);

export { getReportByQueryId };
