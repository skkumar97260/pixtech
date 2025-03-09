import API from "./api";
import { Developers } from "./endpoint";



export const getDevelopers = (data) => {
    return API.get(`${Developers}/`, data);
};

export const getSingleDeveloper = (data) => {
    return API.get(`${Developers}/getSingleDeveloper`, { params: { _id: data } });
}

