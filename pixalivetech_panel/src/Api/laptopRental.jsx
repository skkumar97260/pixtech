import API from "./api";
import { Laptoprental } from "./endpoint";

export const addLaptop = (data) => {
    return API.post(`${Laptoprental}/`, data);
};

export const getLaptops = (data) => {
    return API.get(`${Laptoprental}/`, data);
};

export const getSingleLaptop = (data) => {
    return API.get(`${Laptoprental}/getSingleRental`, { params: { _id: data } });
};

export const updateLaptop = (data) => {
    return API.put(`${Laptoprental}/`, data);
}

export const deleteLaptop = (data) => {
    return API.delete(`${Laptoprental}/`, { params: { _id: data } });
}