import axiosService from "./axiosService";
import {baseURL, urls} from "../config";

export const commentService = {
    getAllComments: () => axiosService.get(baseURL + urls.comments).then(value => value.data),
    createComment: (data) => axiosService.post(baseURL + urls.comments, data).then(value => value.data),
}
