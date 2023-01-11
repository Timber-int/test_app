import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { User } from './user';

export interface IToken extends IDefaultValue {
    id: number;
    accessToken: string;
    refreshToken: string;
    userId: number,
}

@Entity('tokens', { database: CONSTANTS.DATA_BASE })
export class Token extends DefaultValue implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
