import {IGenderCategory} from "./genderCategoryInterface";

export interface IGender {
    title: string,
    genderCategory?:IGenderCategory[],
}

export interface IGenderResponse extends IGender {
    id: number;
}
