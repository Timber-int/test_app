import {axiosService} from "./axiosService";
import {IGender, IGenderResponse} from "../interfaces";
import {baseURL, urls} from "../config";

export const genderService = {
    getAllGenders: () => axiosService.get<{ data: IGenderResponse[] }>(baseURL + urls.genders).then(value => value.data),
    createGender: (data: IGender) => axiosService.post<{ data: IGenderResponse }>(baseURL + urls.genders).then(value => value.data),
    deleteGenderById: (id: number) => axiosService.delete<{ data: IGenderResponse }>(baseURL + urls.genders + '/' + id).then(value => value.data),
}
