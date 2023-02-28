import {IGenderCategoryResponse} from "./genderCategoryInterface";
import {ICategoryResponse} from "./categoryInterface";

export interface IProduct {
    title: string,
    photo: string,
    price: number,
    count: number,
    hasDiscount: boolean,
    discount: number,
    selected:boolean,
    priceBeforeDiscount: number
    categoryId: number,
    genderCategoryId: number,
    category?: ICategoryResponse,
    genderCategory?: IGenderCategoryResponse,
    // productInformation?:ProductInformation,
    // productSizes?:ProductSize[],
    // productPhotos?:ProductPhoto[],
}

export interface IProductResponse extends IProduct {
    id: number
}
