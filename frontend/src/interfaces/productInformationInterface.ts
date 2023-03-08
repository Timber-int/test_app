export interface IProductInformation  {
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
}

export interface IProductInformationResponse extends IProductInformation{
    id: number,
}
