import axiosService from "./axiosService";
import {baseURL, urls} from "../config";

export const postService = {
    getAllPosts: () => axiosService.get(baseURL + urls.posts).then(value => value.data),
    createPost: (post) => axiosService.post(baseURL + urls.posts, post).then(value => value.data),
    deletePostById: (id) => axiosService.delete(baseURL + urls.posts + '/' + id).then(value => value.data),
    updatePostById: (id, post) => axiosService.put(baseURL + urls.posts + '/' + id, post).then(value => value.data),
}
