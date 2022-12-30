import axiosService from "./axiosService";
import {baseURL, urls} from "../config";

export const dishService = {
    getAllDishes: (id, page, perPage, name) => axiosService.get(baseURL + urls.dishes + urls.category + '/' + id + `?page=${page ? page : 1}&perPage=${perPage}&name=${name}`).then(value => value.data)
}
