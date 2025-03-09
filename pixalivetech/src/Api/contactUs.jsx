import API from "./api";
import { contactUs } from "./endpoint";

export const saveContact = async (data) => {  
   return await API.post(`${contactUs}/`, data);
};