import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Product } from './product';

export interface IProductSize extends IDefaultValue {
    id: number,
    productSize: number,
    productId:number,
    product?: Product,
}

@Entity('productsizes', { database: CONSTANTS.DATA_BASE })
export class ProductSize extends DefaultValue implements IProductSize {
    @Column({
        type: 'int',
        nullable: false,
    })
        productSize: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        productId: number;

    @ManyToOne(() => Product, (product:Product) => product.productSizes)
    @JoinColumn({ name: 'productId' })
        product: Product;
}
