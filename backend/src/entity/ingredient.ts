import {
    Column, Entity, JoinTable, ManyToMany,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Dish } from './dish';

export interface IIngredient extends IDefaultValue {
    name: string,
    dishId: number,
}

@Entity('ingredients', { database: CONSTANTS.DATA_BASE })
export class Ingredient extends DefaultValue implements IIngredient {
    @Column({
        type: 'varchar',
        width: 255,
        unique: true,
        nullable: false,
    })
        name: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        dishId: number;

    @ManyToMany(() => Dish, (Dish) => Dish.ingredients)
    @JoinTable()
        dishes: Dish[];
}
