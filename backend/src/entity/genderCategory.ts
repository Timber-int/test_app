import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Gender } from './gender';
import { Category } from './category';
import { Product } from './product';

export interface IGenderCategory extends IDefaultValue {
    id: number,
    title: string,
    genderId:number,
    gender?:Gender,
    category?:Category[],
    products?:Product[],
}

@Entity('gendercategories', { database: CONSTANTS.DATA_BASE })
export class GenderCategory extends DefaultValue implements IGenderCategory {
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
        genderId: number;

    @ManyToOne(() => Gender, (gender:Gender) => gender.genderCategory)
    @JoinColumn({ name: 'genderId' })
        gender: Gender;

    @OneToMany(() => Category, (category:Category) => category.genderCategory)
        category: Category[];

    @OneToMany(() => Product, (products:Product) => products.genderCategory)
        products: Product[];
}
