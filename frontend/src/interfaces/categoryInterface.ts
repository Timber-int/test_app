import {IGenderCategoryResponse} from "./genderCategoryInterface";

export interface ICategory {
    title: string,
    genderCategoryId: number,
    genderCategory?: IGenderCategoryResponse,
    // products?: Product[],
}

export interface ICategoryResponse extends ICategory {
    id: number
}
