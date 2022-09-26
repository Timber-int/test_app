import { Column, Entity, OneToMany } from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue } from './defaultValue';
import { Comment } from './comments';

export interface IProduct {
    id: number,
    imageUrl: string,
    name: string,
    count: number,
    width: number,
    height: number,
    weight: number,
}

@Entity('products', { database: CONSTANTS.DATA_BASE })
export class Product extends DefaultValue implements IProduct {
    @Column({
        type: 'text',
        nullable: false,
    })
        imageUrl: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        name: string;

    @Column({
        type: 'int',
    })
        count: number;

    @Column({
        type: 'int',
    })
        width: number;

    @Column({
        type: 'int',
    })
        height: number;

    @Column({
        type: 'int',
    })
        weight: number;

    @OneToMany(() => Comment, (Comment) => Comment.productData)
        comments: Comment[];
}
