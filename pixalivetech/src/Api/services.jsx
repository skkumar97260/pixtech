import API from "./api";
import { Services } from "./endpoint";



export const getServices = (data) => {
    return API.get(`${Services}/`, data);
};

export const getSingleService = (data) => {
    return API.get(`${Services}/getSingleService`, { params: { _id: data } });
};

