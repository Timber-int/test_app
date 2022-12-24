import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Dish } from './dish';

export interface ICategory extends IDefaultValue {
    id: number,
    name: string,
    photo: string,
}

@Entity('categories', { database: CONSTANTS.DATA_BASE })
export class Category extends DefaultValue implements ICategory {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        name: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        photo: string;

    @OneToMany(() => Dish, (dish) => dish.category)
        dishes: Dish[];
}
