import { Request } from 'express';
import {
    ICategory, IGender, IProduct, IProductInformation, IProductSize, IUser, ProductPhoto,
} from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationType?: any,
    userRoles?: string[],
    user?: IUser,
    category?:ICategory,
    gender?:IGender,
    product?:IProduct,
    productInformation?:IProductInformation,
    productSize?:IProductSize,
    productPhoto?:ProductPhoto,
}
