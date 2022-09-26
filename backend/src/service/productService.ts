import { DeleteResult, UpdateResult } from 'typeorm';
import { IProduct, Product } from '../entity';
import { productRepository } from '../repository';

class ProductService {
    public async getAllProducts(): Promise<IProduct[]> {
        return productRepository.getAllProducts();
    }

    public async getProductById(id:number): Promise<IProduct | undefined> {
        return productRepository.getProductById(id);
    }

    public async deleteProductById(id:number): Promise<DeleteResult> {
        return productRepository.deleteProductById(id);
    }

    public async createProduct(productData: Product): Promise<IProduct> {
        return productRepository.createProduct(productData);
    }

    public async updateProduct(id: number, updateProductData: Partial<Product>): Promise<UpdateResult> {
        return productRepository.updateProduct(id, updateProductData);
    }
}

export const productService = new ProductService();
