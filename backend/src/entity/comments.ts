import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';
import { Product } from './products';

export interface IComment {
    id: number,
    description: string,
    productId: number,
}

@Entity('comments', { database: CONSTANTS.DATA_BASE })
export class Comment extends DefaultValue implements IComment {
    @Column({
        type: 'text',
        nullable: false,
    })
        description: string;

    @Column({
        type: 'int',
    })
        productId: number;

    @ManyToOne(() => Product, (Product) => Product.comments)
    @JoinColumn({ name: 'productId' })
        productData: Product;
}
