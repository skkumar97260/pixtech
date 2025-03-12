import API from "./api";
import { Ourclients } from "./endpoint";

export const addClient = (data) => {
    return API.post(`${Ourclients}/`, data);
};

export const getClients = (data) => {
    return API.get(`${Ourclients}/`, data);
};
export const getSingleClient = (data) => {
    return API.get(`${Ourclients}/getSingleClient`, { params: { _id: data } });
}

export const updateClient = (data) => {
    return API.put(`${Ourclients}/`, data);
};

export const deleteClient = (data) => {
    return API.delete(`${Ourclients}/`, { params: { _id: data } });
};