import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { User } from './user';
import { Post } from './post';

export interface IPostVideo extends IDefaultValue {
    id: number,
    video: string,
    userId: number,
    postId: number,
}

@Entity('postvideos', { database: CONSTANTS.DATA_BASE })
export class PostVideo extends DefaultValue implements IPostVideo {
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
        userId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        postId: number;

    @ManyToOne(() => User, (user) => user.postVideos)
    @JoinColumn({ name: 'userId' })
        user: User;

    @ManyToOne(() => Post, (post) => post.videos)
    @JoinColumn({ name: 'postId' })
        singlePost: Post;
}
