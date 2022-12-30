import axiosService from "./axiosService";
import {baseURL, urls} from "../config";

export const categoryService = {
    getAllCategory: () => axiosService.get(baseURL + urls.categories).then(value => value.data),
}
