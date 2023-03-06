export interface IProductPhoto {
    photo: string,
    productId: number,
}

export interface IProductPhotoResponse extends IProductPhoto {
    id: number,
}
