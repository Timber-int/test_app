import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Dish } from './dish';

export interface IDishVideo extends IDefaultValue {
    id: number,
    video: string,
    dishId: number,
}

@Entity('recipevideos', { database: CONSTANTS.DATA_BASE })
export class DishVideo extends DefaultValue implements IDishVideo {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        video: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        dishId: number;

    @ManyToOne(() => Dish, (dish) => dish.videos)
    @JoinColumn({ name: 'dishId' })
        dish: Dish;
}
