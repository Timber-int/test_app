import { Request } from 'express';
import {
    ICategory, IGender, IProduct, IUser, ProductInformation,
} from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationType?: any,
    userRoles?: string[],
    user?: IUser,
    category?:ICategory,
    gender?:IGender,
    product?:IProduct,
    productInformation?:ProductInformation,
}
