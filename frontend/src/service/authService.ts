import {baseURL, urls} from "../config";
import {ILogin, IRegistration, IUserResponse} from "../interfaces";
import {axiosService} from "./axiosService";

export const authService = {
    registration: (data: IRegistration) => axiosService.post<IUserResponse>(baseURL + urls.auth + urls.registration, data).then(value => value.data),
    login: (data: ILogin) => axiosService.post<IUserResponse>(baseURL + urls.auth + urls.login, data).then(value => value.data),
    logout: () => axiosService.post<IUserResponse>(baseURL + urls.auth + urls.logout).then(value => value.data),
    refresh: () => axiosService.post<IUserResponse>(baseURL + urls.auth + urls.refresh).then(value => value.data)
}
