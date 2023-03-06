import { DeleteResult } from 'typeorm';
import { IProductPhoto, ProductPhoto } from '../entity';
import { productPhotoRepository } from '../repository';

class ProductPhotoService {
    public async getAllProductPhotos(): Promise<ProductPhoto[]> {
        return productPhotoRepository.getAllProductPhotos();
    }

    public async getAllProductPhotosByProductId(productId:number): Promise<ProductPhoto[]> {
        return productPhotoRepository.getAllProductPhotosByProductId(productId);
    }

    public async getProductPhotoById(id: number): Promise<ProductPhoto | undefined> {
        return productPhotoRepository.getProductPhotoById(id);
    }

    public async createProductPhoto(productPhoto: IProductPhoto): Promise<ProductPhoto> {
        return productPhotoRepository.createProductPhoto(productPhoto);
    }

    public async deleteProductPhotoById(id: number): Promise<DeleteResult> {
        return productPhotoRepository.deleteProductPhotoById(id);
    }
}

export const productPhotoService = new ProductPhotoService();
