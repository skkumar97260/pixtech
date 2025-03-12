import API from "./api";
import { Developers } from "./endpoint";

export const addDeveloper = async (data) => {  
    return await API.post(`${Developers}/`, data);
};

export const getDevelopers = (data) => {
    return API.get(`${Developers}/`, data);
};

export const getSingleDeveloper = (data) => {
    return API.get(`${Developers}/getSingleDeveloper`, { params: { _id: data } });
}

export const updateDeveloper = (data) => {
    return API.put(`${Developers}/`, data);
};

export const deleteDeveloper = (data) => {
    return API.delete(`${Developers}/`, { params: { _id: data } });
};