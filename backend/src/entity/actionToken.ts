import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { User } from './user';

export interface IActionToken extends IDefaultValue{
    actionToken:string,
    userId:number,
}
@Entity('actionToken', { database: CONSTANTS.DATA_BASE })
export class ActionToken extends DefaultValue implements IActionToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}

export const actionToken = new ActionToken();
