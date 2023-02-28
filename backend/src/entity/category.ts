import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Product } from './product';
import { GenderCategory } from './genderCategory';

export interface ICategory extends IDefaultValue {
    id: number,
    title: string,
    genderCategoryId:number,
    genderCategory?:GenderCategory,
    products?: Product[],
}

@Entity('categories', { database: CONSTANTS.DATA_BASE })
export class Category extends DefaultValue implements ICategory {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        title: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        genderCategoryId: number;

    @ManyToOne(() => GenderCategory, (genderCategory:GenderCategory) => genderCategory.category)
    @JoinColumn({ name: 'genderCategoryId' })
        genderCategory: GenderCategory;

    @OneToMany(() => Product, (product: Product) => product.category)
        products: Product[];
}
