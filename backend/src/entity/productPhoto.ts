import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Product } from './product';

export interface IProductPhoto extends IDefaultValue {
    id: number,
    photo: string,
    productId:number,
    product?: Product,
}

@Entity('productphotos', { database: CONSTANTS.DATA_BASE })
export class ProductPhoto extends DefaultValue implements IProductPhoto {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        photo: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        productId: number;

    @ManyToOne(() => Product, (product:Product) => product.productPhotos)
    @JoinColumn({ name: 'productId' })
        product: Product;
}
