import API from "./api";
import { contactUs } from "./endpoint";

export const getContactMessages = () => {
    return API.get(`${contactUs}/`);
}

export const deleteContactMessage = (data) => {
    return API.delete(`${contactUs}/`,{ params: { _id: data } });
}

export const getSingleUsers = (data) => {
    return API.get(`${contactUs}/getSingleUser`,{ params: { _id: data } });
}