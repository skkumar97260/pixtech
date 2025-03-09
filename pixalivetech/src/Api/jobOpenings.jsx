import API from "./api";
import { JobOpenings } from "./endpoint";



export const getOpenings = (data) => {
    return API.get(`${JobOpenings}/`, data);
};
export const getSingleOpening = (data) => {
    return API.get(`${JobOpenings}/getSingleJobOpening`, { params: { _id: data } });
}