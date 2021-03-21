import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://localhost:5100/",
});

export default apiClient;
