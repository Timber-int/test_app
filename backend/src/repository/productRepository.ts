import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IProduct, Product } from '../entity';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
    public async getAllProducts(): Promise<IProduct[]> {
        return getManager().getRepository(Product).find();
    }

    public async getProductById(id: number): Promise<IProduct | undefined> {
        return getManager().getRepository(Product).findOne(id);
    }

    public async createProduct(productData: IProduct): Promise<IProduct> {
        return getManager().getRepository(Product).save(productData);
    }

    public async updateProduct(id: number, updateProductData: Partial<IProduct>): Promise<UpdateResult> {
        return getManager().getRepository(Product).update(id, updateProductData);
    }
}

export const productRepository = new ProductRepository();
