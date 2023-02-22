import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { DefaultValue, IDefaultValue } from './defaultValue';
import { CONSTANTS } from '../constants';
import { Product } from './product';

export interface IProductInformation extends IDefaultValue {
    id: number,
    collection: string,
    season:string,
    typeOfShoes:string,
    color:string,
    colorRange:string,
    topMaterial:string,
    inside:string,
    typeOfHeels:string,
    heels:string,
    production:string,
    additional:string,
    colorOrShade:string,
    productId:number,
    product?: Product,
}

@Entity('productinformation', { database: CONSTANTS.DATA_BASE })
export class ProductInformation extends DefaultValue implements IProductInformation {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        collection: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     season: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     typeOfShoes: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     color: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     colorRange: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     topMaterial: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     inside: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     typeOfHeels: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     heels: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     production: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     additional: string;

 @Column({
     type: 'varchar',
     width: 255,
     nullable: false,
 })
     colorOrShade: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        productId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
        product: Product;
}
