import { DeleteResult, UpdateResult } from 'typeorm';
import { IProduct, Product } from '../entity';
import { productRepository } from '../repository';
import { IPaginationResponse } from '../interface';

class ProductService {
    public async getAllProducts(
        genderId: number,
        categoryId: number | null,
        genderCategoryId: number|null,
        searchObject: Partial<IProduct>,
        limit: number,
        page: number): Promise<IPaginationResponse<IProduct>> {
        return productRepository.getAllProducts(genderId, categoryId, genderCategoryId, searchObject, limit, page);
    }

    public async getProductByTitle(title: string): Promise<Product | undefined> {
        return productRepository.getProductByTitle(title);
    }

    public async getProductById(id: number): Promise<Product | undefined> {
        return productRepository.getProductById(id);
    }

    public async createProduct(product: IProduct): Promise<Product> {
        return productRepository.createProduct(product);
    }

    public async deleteProductById(id: number): Promise<DeleteResult> {
        return productRepository.deleteProductById(id);
    }

    public async updateProductById(id: number, productDataToUpdate: Partial<IProduct>): Promise<UpdateResult> {
        return productRepository.updateProductById(id, productDataToUpdate);
    }

    public async updateProductByIdSetDiscount(product: IProduct, productDataToUpdate: Partial<IProduct>): Promise<UpdateResult> {
        const { discount } = productDataToUpdate;
        const { price } = product;

        if (discount && price) {
            productDataToUpdate.hasDiscount = true;
            productDataToUpdate.priceBeforeDiscount = price;
            productDataToUpdate.price = price - ((price * discount) / 100);
        }

        return productRepository.updateProductById(product.id, productDataToUpdate);
    }
}

export const productService = new ProductService();
