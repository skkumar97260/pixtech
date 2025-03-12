import API from "./api";
import { Login } from "./endpoint";


export const adminLogin = (data) => {
  return API.post(`${Login}/adminLogin`, data);
};

