import axiosService from "./axiosService";
import {baseURL, urls} from "../config";

export const commentService={
    getAllComments: () => axiosService.get(baseURL + urls.comments).then(value => value.data),
    createComment: (commentData) => axiosService.post(baseURL + urls.comments, commentData).then(value => value.data),
    deleteComment: (id) => axiosService.delete(baseURL + urls.comments+ '/' + id).then(value => value.data)
}
