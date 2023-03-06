import { DeleteResult } from 'typeorm';
import { IProductSize, ProductSize } from '../entity';
import { productSizeRepository } from '../repository';

class ProductSizeService {
    public async getAllProductSizes(): Promise<ProductSize[]> {
        return productSizeRepository.getAllProductSizes();
    }

    public async getAllProductSizesByProductId(productId:number): Promise<ProductSize[]> {
        return productSizeRepository.getAllProductSizesByProductId(productId);
    }

    public async getAllProductSizesByProductIdAndSize(productId:number, productSize:number): Promise<ProductSize|undefined> {
        return productSizeRepository.getAllProductSizesByProductIdAndSize(productId, productSize);
    }

    public async getProductSizeById(id: number): Promise<ProductSize | undefined> {
        return productSizeRepository.getProductSizeById(id);
    }

    public async createProductSize(productSize: IProductSize): Promise<ProductSize> {
        return productSizeRepository.createProductSize(productSize);
    }

    public async deleteProductSizeById(id: number): Promise<DeleteResult> {
        return productSizeRepository.deleteProductSizeById(id);
    }
}

export const productSizeService = new ProductSizeService();
