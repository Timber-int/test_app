import {IGenderResponse} from "./genderInterface";
import {ICategoryResponse} from "./categoryInterface";

export interface IGenderCategory {
    title: string,
    genderId: number,
    gender?: IGenderResponse,
    category?: ICategoryResponse[],
}

export interface IGenderCategoryResponse extends IGenderCategory {
    id: number
}
