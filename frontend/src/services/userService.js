import axiosService from "./axiosService";
import {baseURL, urls} from "../config";

export const userService = {
    getUserById: (id) => axiosService.get(baseURL + urls.users + '/' + id).then(value => value.data),
}
