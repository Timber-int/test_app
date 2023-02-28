import {axiosService} from "./axiosService";
import {ICategory, ICategoryResponse} from "../interfaces";
import {baseURL, urls} from "../config";

export const categoryService = {
    getAllCategory: () => axiosService.get<{ data: ICategoryResponse[] }>(baseURL + urls.categories).then(value => value.data),
    createCategory: (data: ICategory) => axiosService.post<{ data: ICategoryResponse }>(baseURL + urls.categories).then(value => value.data),
    deleteCategoryById: (id: number) => axiosService.delete<{ data: ICategoryResponse }>(baseURL + urls.categories + '/' + id).then(value => value.data),
}
