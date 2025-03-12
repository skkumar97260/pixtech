import API from "./api";
import { Services } from "./endpoint";

export const addService = async (data) => {  
    return await API.post(`${Services}/`, data);
};

export const getServices = (data) => {
    return API.get(`${Services}/`, data);
};

export const getSingleService = (data) => {
    return API.get(`${Services}/getSingleService`, { params: { _id: data } });
}

export const updateService = (data) => {
    return API.put(`${Services}/`, data);
};

export const deleteService = (data) => {
    return API.delete(`${Services}/`, { params: { _id: data } });
};