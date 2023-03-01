import {axiosService} from "./axiosService";
import {IPaginationResponse, IProductResponse} from "../interfaces";
import {baseURL, urls} from "../config";

export const productService = {
    getAllProducts:
        (genderId: number, genderCategoryId?: number, categoryId?: number, page: number = 1, perPage: number = 20, title: string = '') => axiosService.get<{ products: IPaginationResponse<IProductResponse> }>
        (baseURL + urls.products + '/' +
            `gender/${genderId}/genderCategory?genderCategoryId=${genderCategoryId ? genderCategoryId : ''}/category?id=${categoryId ? categoryId : ''}&page=${page}&perPage=${perPage}&title=${title}`).then(value => value.data),
}
