import {IGenderCategoryResponse} from "./genderCategoryInterface";
import {IProductResponse} from "./productInterface";

export interface ICategory {
    title: string,
    genderCategoryId: number,
    genderCategory?: IGenderCategoryResponse,
    products?: IProductResponse[],
}

export interface ICategoryResponse extends ICategory {
    id: number
}
