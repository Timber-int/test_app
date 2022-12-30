import { Column, Entity } from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';

export interface IUser extends IDefaultValue {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string;
    role?: string;
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

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        default: 'user',
    })
        role: string;
}
