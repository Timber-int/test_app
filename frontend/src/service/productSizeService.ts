import {axiosService} from "./axiosService";
import {IProductSize, IProductSizeResponse} from "../interfaces";
import {baseURL, urls} from "../config";

export const productSizeService = {
    getAllProductSizes: () => axiosService.get<{ data: IProductSizeResponse[] }>(baseURL + urls.productSizes).then(value => value.data),
    createProductSize: (data: IProductSize) => axiosService.post<{ data: IProductSizeResponse }>(baseURL + urls.productSizes).then(value => value.data),
    deleteProductSizeById: (id: number) => axiosService.delete<{ data: IProductSizeResponse }>(baseURL + urls.productSizes + '/' + id).then(value => value.data),

}
