import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { User } from './user';
import { Post } from './post';

export interface IComment extends IDefaultValue {
    id: number,
    text: string,
    userId: number;
    postId: number;
    authorFirstName: string;
    authorLastName: string;
}

@Entity('comments', { database: CONSTANTS.DATA_BASE })
export class Comment extends DefaultValue implements IComment {
    @Column({
        type: 'text',
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        postId: number;

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
        type: 'int',
        nullable: false,
    })
        userId: number;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'userId' })
        user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: Post;
}
