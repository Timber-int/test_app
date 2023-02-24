import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Category } from './category';
import { ProductInformation } from './productInformation';
import { ProductSize } from './productSize';
import { ProductPhoto } from './productPhoto';

export interface IProduct extends IDefaultValue {
    id: number,
    title: string,
    photo: string,
    price: number,
    count: number,
    hasDiscount: boolean,
    discount: number,
    selected:boolean,
    priceBeforeDiscount: number
    categoryId: number,
    category?: Category,
    productInformation?:ProductInformation,
    productSizes?:ProductSize[],
    productPhotos?:ProductPhoto[],
}

@Entity('products', { database: CONSTANTS.DATA_BASE })
export class Product extends DefaultValue implements IProduct {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
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
        type: 'boolean',
        nullable: false,
        default: false,
    })
        selected: boolean;

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

    @OneToOne(() => ProductInformation)
    // @JoinColumn()
        productInformation: ProductInformation;

    @OneToMany(() => ProductSize, (productSize:ProductSize) => productSize.product)
        productSizes: ProductSize[];

    @OneToMany(() => ProductPhoto, (productPhoto:ProductPhoto) => productPhoto.product)
        productPhotos: ProductPhoto[];
}
