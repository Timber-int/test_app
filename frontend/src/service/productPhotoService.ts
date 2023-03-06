import {axiosService} from "./axiosService";
import {IProductPhoto, IProductPhotoResponse} from "../interfaces";
import {baseURL, urls} from "../config";

export const productPhotoService = {
    getAllProductPhotos: () => axiosService.get<{ data: IProductPhotoResponse[] }>(baseURL + urls.productPhotos).then(value => value.data),
    createProductPhoto: (data: IProductPhoto) => axiosService.post<{ data: IProductPhotoResponse }>(baseURL + urls.productPhotos).then(value => value.data),
    deleteProductPhotoById: (id: number) => axiosService.delete<{ data: IProductPhotoResponse }>(baseURL + urls.productPhotos + '/' + id).then(value => value.data),

}
