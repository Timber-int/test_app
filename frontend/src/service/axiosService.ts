import axios from "axios";
import { baseURL } from "../config";
import Cookies from "universal-cookie";
import { TokenType } from "../constants";
const cookies = new Cookies();


export const axiosService = axios.create({
    baseURL,
});

axiosService.interceptors.request.use(config => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${cookies.get(TokenType.ACCESS_TOKEN)} ${cookies.get(TokenType.REFRESH_TOKEN)}`;
    return config;
});

// axiosService.interceptors.response.use(config => {
//     return config;
// }, async (error) => {
//     const originalRequest = error.config;
//     if ((error.response.status === 401 || error.response.status === 500) && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await authService.refresh(baseURL + urls.auth + urls.refresh);
//             localStorage.setItem(TokenType.ACCESS, response.accessToken);
//             localStorage.setItem(TokenType.REFRESH, response.refreshToken);
//             return axiosService.request(originalRequest);
//         } catch (e) {
//             console.error('User is not authorization!!!');
//         }
//         throw error;
//     }
// });

