import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { GenderCategory } from './genderCategory';
import { Product } from './product';

export interface IGender extends IDefaultValue {
    id: number,
    title: string,
    genderCategory?:GenderCategory[]
    products?:Product[]
}

@Entity('genders', { database: CONSTANTS.DATA_BASE })
export class Gender extends DefaultValue implements IGender {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        title: string;

    @OneToMany(() => GenderCategory, (genderCategory:GenderCategory) => genderCategory.gender)
        genderCategory: GenderCategory[];

    @OneToMany(() => Product, (products:Product) => products.gender)
        products: Product[];
}
