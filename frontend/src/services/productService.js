import axiosService from "./axiosService";
import {baseURL, urls} from "../config";

export const productService = {
    getAllProducts: () => axiosService.get(baseURL + urls.products).then(value => value.data),
    createProduct: (productData) => axiosService.post(baseURL + urls.products, productData).then(value => value.data)
}
