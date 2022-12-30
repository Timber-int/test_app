import {
    Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Category } from './category';
import { DishVideo } from './dishVideo';
import { Ingredient } from './ingredient';

export interface IDish extends IDefaultValue {
    id: number,
    name: string,
    photo: string,
    categoryId: number,
    recipe:string,
    calories: number,
}

@Entity('dishes', { database: CONSTANTS.DATA_BASE })
export class Dish extends DefaultValue implements IDish {
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

    @Column({
        type: 'text',
        nullable: false,
    })
        recipe: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        calories: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        categoryId: number;

    @ManyToOne(() => Category, (category) => category.dishes)
    @JoinColumn({ name: 'categoryId' })
        category: Category;

    @OneToMany(() => DishVideo, (dishVideo) => dishVideo.dish)
        videos: DishVideo[];

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.dishes)
    @JoinTable()
        ingredients: Ingredient[];
}
