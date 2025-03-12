import API from "./api";
import { JobOpenings } from "./endpoint";

export const addOpening = async (data) => {  
    return await API.post(`${JobOpenings}/`, data);
};

export const getOpenings = (data) => {
    return API.get(`${JobOpenings}/`, data);
};

export const getSingleOpening = (data) => {
    return API.get(`${JobOpenings}/getSingleJobOpening`, { params: { _id: data } });
}

export const updateOpening = (data) => {
    return API.put(`${JobOpenings}/`, data);
};

export const deleteOpening = (data) => {
    return API.delete(`${JobOpenings}/`, { params: { _id: data } });
};