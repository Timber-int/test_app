import axiosService from "./axiosService";
import {baseURL, urls} from "../config";

export const postService = {
    getAllPosts: (page, perPage, title, viewsSort = false) => axiosService.get(baseURL + urls.posts + `?page=${page ? page : 1}&perPage=${perPage ? perPage : 1}&title=${title === '' ? '' : title}&viewsSort=${viewsSort}`).then(value => value.data),
    createPost: (post) => axiosService.post(baseURL + urls.posts, post).then(value => value.data),
    deletePostById: (id) => axiosService.delete(baseURL + urls.posts + '/' + id).then(value => value.data),
    changePostViewsById: (id) => axiosService.put(baseURL + urls.posts + '/views/' + id).then(value => value.data),
    updatePostById: (id, post) => axiosService.put(baseURL + urls.posts + '/' + id, post).then(value => value.data),
}
