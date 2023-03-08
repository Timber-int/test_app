import {axiosService} from "./axiosService";
import {IProductInformation, IProductInformationResponse} from "../interfaces";
import {baseURL, urls} from "../config";

export const productInformationService = {
    getProductInformationByProductId: (id: number) => axiosService.get<{ data: IProductInformationResponse }>(baseURL + urls.productInformation + '/' + id).then(value => value.data),
    createProductInformation: (data: IProductInformation) => axiosService.post<{ data: IProductInformationResponse }>(baseURL + urls.productInformation).then(value => value.data),
    deleteProductInformationById: (id: number) => axiosService.delete<{ data: IProductInformationResponse }>(baseURL + urls.productInformation + '/' + id).then(value => value.data),
}
