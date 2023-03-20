import {baseURL, urls} from "../config";
import {
    IForgotPassword,
    IForgotPasswordSet,
    ILogin,
    IRegistration,
    IUserResponse,
    IUserResponseWithActionToken
} from "../interfaces";
import {axiosService} from "./axiosService";

export const authService = {
    registration: (data: IRegistration) => axiosService.post<IUserResponse>(baseURL + urls.auth + urls.registration, data).then(value => value.data),
    forgotPassword: (data: IForgotPassword) => axiosService.post<IUserResponseWithActionToken>(baseURL + urls.auth + urls.forgot + urls.password, data).then(value => value.data),
    forgotPasswordSet: (data: IForgotPasswordSet) => axiosService.post<IUserResponse>(baseURL + urls.auth + urls.forgot + urls.password + urls.set, data).then(value => value.data),
    login: (data: ILogin) => axiosService.post<IUserResponse>(baseURL + urls.auth + urls.login, data).then(value => value.data),
    logout: () => axiosService.post<IUserResponse>(baseURL + urls.auth + urls.logout).then(value => value.data),
    refresh: () => axiosService.post<IUserResponse>(baseURL + urls.auth + urls.refresh).then(value => value.data)
}
