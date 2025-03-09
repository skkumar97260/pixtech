import API from "./api";
import { workingSpace } from "./endpoint";

export const WorkingSpace = async (data) => {  
   return await API.get(`${workingSpace}/`, data);
};