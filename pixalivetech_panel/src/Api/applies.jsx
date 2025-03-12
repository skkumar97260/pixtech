import API from "./api";
import { Apply } from "./endpoint";

export const getApplies = () => {
    return API.get(`${Apply}/`);
}

export const deleteApply = (data) => {
    return API.delete(`${Apply}/`,{ params: { _id: data } });
}

export const getSingleApply = (data) => {
    return API.get(`${Apply}/getSingleApply`,{ params: { _id: data } });
}