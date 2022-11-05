import { Column, Entity } from 'typeorm';
import { CONSTANTS } from '../constants';
import { DefaultValue, IDefaultValue } from './defaultValues';

export interface IName extends IDefaultValue {
    name: string;
}

@Entity('names', { database: CONSTANTS.DATA_BASE })
export class Name extends DefaultValue implements IName {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        name: string;
}
