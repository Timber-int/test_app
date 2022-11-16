import axios from "axios";
import {baseURL, urls} from "../config";
import {TokenType} from "../constants";
import {authService} from "./authService";

const axiosService = axios.create({
    baseURL,
});

axiosService.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(TokenType.ACCESS)} ${localStorage.getItem(TokenType.REFRESH)}`;
    return config;
});

axiosService.interceptors.response.use(config => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 500) && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await authService.refresh(baseURL + urls.auth + urls.refresh);
            localStorage.setItem(TokenType.ACCESS, response.accessToken);
            localStorage.setItem(TokenType.REFRESH, response.refreshToken);
            return axiosService.request(originalRequest);
        } catch (e) {
            console.error('User is not authorization!!!');
        }
        throw error;
    }
});

export default axiosService;
