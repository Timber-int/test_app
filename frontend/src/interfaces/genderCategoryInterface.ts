import {IGenderResponse} from "./genderInterface";
import {ICategoryResponse} from "./categoryInterface";
import {IProductResponse} from "./productInterface";

export interface IGenderCategory {
    title: string,
    genderId: number,
    gender?: IGenderResponse,
    category?: ICategoryResponse[],
    products?: IProductResponse[],
}

export interface IGenderCategoryResponse extends IGenderCategory {
    id: number
}
