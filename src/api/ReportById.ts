import client from "./Client";

const endPoint = "/query-report/";
const getReportById = (id: string) => client.get(endPoint + id);

export { getReportById };
