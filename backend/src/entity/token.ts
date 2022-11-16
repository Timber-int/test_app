import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { User } from './user';
import { CONSTANTS } from '../constants';
import { DefaultValue, IDefaultValue } from './defaultValue';

export interface IToken extends IDefaultValue {
    refreshToken: string,
    accessToken: string,
    userId: number
}

@Entity('tokens', { database: CONSTANTS.DATA_BASE })
export class Token extends DefaultValue implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
