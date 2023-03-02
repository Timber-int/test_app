import {axiosService} from "./axiosService";
import {IPaginationResponse, IProductResponse} from "../interfaces";
import {baseURL, urls} from "../config";
import {IGetAllProductData} from "../store/slices/productSlice";

export const productService = {
    getAllProducts:
        (data:IGetAllProductData) => axiosService.get<{ products: IPaginationResponse<IProductResponse> }>
        (baseURL + urls.products + '/' +
            `gender/${data.genderId}?genderCategoryId=${data.genderCategoryId ? data.genderCategoryId : ''}&categoryId=${data.categoryId ? data.categoryId : ''}&page=${data.page}&perPage=${data.perPage}&title=${data.title}`).then(value => value.data),
}
