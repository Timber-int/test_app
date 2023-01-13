import axios from "axios";
import {baseMovieURL, baseURL, urls} from "../config";
import {AUTHORIZATION, TokenType} from "../constants";
import {authService} from "./authService";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const axiosService = axios.create({
    baseURL,
});
export const axiosMovieService = axios.create({
    baseURL: baseMovieURL,
    headers: {
       Authorization: AUTHORIZATION
    }
});

axiosService.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${cookies.get(TokenType.ACCESS_TOKEN)} ${cookies.get(TokenType.REFRESH_TOKEN)}`;
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
            cookies.set(TokenType.ACCESS_TOKEN, response.accessToken, [{httpOnly: true}]);
            cookies.set(TokenType.REFRESH_TOKEN, response.refreshToken, [{httpOnly: true}]);
            return axiosService.request(originalRequest);
        } catch (e) {
            console.error('User is not authorization!!!');
        }
        throw error;
    }
});

