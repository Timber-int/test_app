import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Gender } from './gender';
import { Product } from './product';

export interface ICategory extends IDefaultValue {
    id: number,
    title: string,
    genderId:number,
    gender?:Gender,
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
        genderId: number;

    @ManyToOne(() => Gender, (gender:Gender) => gender.category)
    @JoinColumn({ name: 'genderId' })
        gender: Gender;

    @OneToMany(() => Product, (product: Product) => product.category)
        products: Product[];
}
