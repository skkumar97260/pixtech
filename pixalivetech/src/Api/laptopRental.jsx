import API from "./api";
import { Laptoprental } from "./endpoint";

export const getLaptops = (data) => {
    return API.get(`${Laptoprental}/`, data);
};

