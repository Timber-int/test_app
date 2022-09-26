import axiosService from "./axiosService";
import {baseURL, urls} from "../config";

export const productService = {
    getAllProducts: () => axiosService.get(baseURL + urls.products).then(value => value.data),
    createProduct: (productData) => axiosService.post(baseURL + urls.products, productData).then(value => value.data),
    deleteProduct: (id) => axiosService.delete(baseURL + urls.products + '/' + id).then(value => value.data),
    updateProduct: (id, productData) => axiosService.put(baseURL + urls.products + '/' + id, productData).then(value => value.data)
}
