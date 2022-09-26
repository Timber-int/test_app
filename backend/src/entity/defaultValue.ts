import {
    Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

export interface IDefaultValue {
    id: number,
    createdAt: string,
    deletedAt?: string,
}

export class DefaultValue implements IDefaultValue {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;

    @Column()
    @DeleteDateColumn({ type: 'timestamp' })
        deletedAt?: string;
}
