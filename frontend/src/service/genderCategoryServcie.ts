import {axiosService} from "./axiosService";
import {ICategory} from "../interfaces";
import {baseURL, urls} from "../config";
import {IGenderCategoryResponse} from "../interfaces/genderCategoryInterface";

export const genderCategoryService = {
    getAllGenderCategory: (id: number) => axiosService.get<{ data: IGenderCategoryResponse[] }>(baseURL + urls.genderCategories + '/' + id).then(value => value.data),
    createGenderCategory: (data: ICategory) => axiosService.post<{ data: IGenderCategoryResponse }>(baseURL + urls.genderCategories).then(value => value.data),
    deleteGenderCategoryById: (id: number) => axiosService.delete<{ data: IGenderCategoryResponse }>(baseURL + urls.genderCategories + '/' + id).then(value => value.data),
}
