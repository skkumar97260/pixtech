import API from "./api";
import { WorkingSpace } from "./endpoint";

export const addSpace = async (data) => {  
    return await API.post(`${WorkingSpace}/`, data);
};

export const getSpaces = (data) => {
    return API.get(`${WorkingSpace}/`, data);
};

export const getSingleSpace = (data) => {
    return API.get(`${WorkingSpace}/getSingleSpace`, { params: { _id: data } });
}

export const updateSpace = (data) => {
    return API.put(`${WorkingSpace}/`, data);
};

export const deleteSpace = (data) => {
    return API.delete(`${WorkingSpace}/`, { params: { _id: data } });
};