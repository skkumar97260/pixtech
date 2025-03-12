import API from "./api";
import { Admin } from "./endpoint";
export const getSingleAdmin = (data) => {
    return API.get(`${Admin}/getSingleAdmin`, data);
  };