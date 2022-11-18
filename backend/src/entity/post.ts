import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { User } from './user';
import { Comment } from './comment';

export interface IPost extends IDefaultValue {
    id: number,
    title: string,
    text: string,
    photo: string,
    userId: number;
    views?: number;
    authorFirstName: string,
    authorLastName: string,
}

@Entity('posts', { database: CONSTANTS.DATA_BASE })
export class Post extends DefaultValue implements IPost {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        authorFirstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        authorLastName: string;

    @Column({
        type: 'text',
        nullable: false,
    })
        text: string;

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
        userId: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0,
    })
        views: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments: Comment[];
}
