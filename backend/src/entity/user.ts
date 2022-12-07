import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Post } from './post';
import { Comment } from './comment';
import { PostVideo } from './postVideo';

export interface IUser extends IDefaultValue {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string;
}

@Entity('users', { database: CONSTANTS.DATA_BASE })
export class User extends DefaultValue implements IUser {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;

    @OneToMany(() => Post, (post) => post.user)
        posts: Post[];

    @OneToMany(() => PostVideo, (postVideo) => postVideo.user)
        postVideos: PostVideo[];

    @OneToMany(() => Comment, (comment) => comment.user)
        comments: Comment[];
}
