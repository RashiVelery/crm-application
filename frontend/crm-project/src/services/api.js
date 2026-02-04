import axios from "axios";

const api = axios.create({
  baseURL: "https://crm-application-1-r96i.onrender.com/api",
  withCredentials: true
});

export default api;
