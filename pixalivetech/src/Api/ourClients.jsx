import API from "./api";
import { Ourclients } from "./endpoint";



export const getClients = (data) => {
    return API.get(`${Ourclients}/`, data);
};