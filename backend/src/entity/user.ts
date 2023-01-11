import { Column, Entity } from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';

export interface IUser extends IDefaultValue {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: string,
}

@Entity('users', { database: CONSTANTS.DATA_BASE })
export class User extends DefaultValue implements IUser {
    @Column({
        type: 'varchar',
        nullable: false,
        width: 255,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        nullable: false,
        width: 255,
    })
        lastName: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
        width: 255,
    })
        email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        width: 255,
    })
        password: string;

    @Column({
        type: 'varchar',
        nullable: false,
        width: 255,
        default: 'user',
    })
        role?: string;
}
