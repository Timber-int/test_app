import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Category } from './category';

export interface IProduct extends IDefaultValue {
    id: number,
    title: string,
    photo: string,
    price: number,
    count: number,
    hasDiscount: boolean,
    discount: number,
    priceBeforeDiscount: number
    categoryId: number,
    category?: Category,
}

@Entity('products', { database: CONSTANTS.DATA_BASE })
export class Product extends DefaultValue implements IProduct {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        title: string;

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
        count: number;

    @Column({
        type: 'int',
        nullable: false,

    })
        price: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
        priceBeforeDiscount: number;

    @Column({
        type: 'boolean',
        nullable: false,
        default: false,
    })
        hasDiscount: boolean;

    @Column({
        type: 'int',
        nullable: false,
    })
        discount: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        categoryId: number;

    @ManyToOne(() => Category, (category: Category) => category.products)
    @JoinColumn({ name: 'categoryId' })
        category: Category;
}
