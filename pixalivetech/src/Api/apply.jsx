import API from "./api";
import { Apply } from "./endpoint";

export const saveApply = async (data) => {  
   return await API.post(`${Apply}/`, data);
};