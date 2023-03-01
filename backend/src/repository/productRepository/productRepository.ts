import {
    DeleteResult, EntityRepository, getManager, Like, Repository, UpdateResult,
} from 'typeorm';
import { IProduct, Product } from '../../entity';
import { IPaginationResponse } from '../../interface';
import { IProductRepository } from './productRepositoryInterface';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> implements IProductRepository {
    public async getAllProducts(
        genderId: number,
        categoryId: number | null,
        genderCategoryId: number | null,
        searchObject: Partial<IProduct> = {},
        limit: number = 1,
        page: number = 1): Promise<IPaginationResponse<IProduct>> {
        const skip = limit * (page - 1);

        if (!categoryId && !genderCategoryId) {
            const [products, itemCount] = await getManager()
                .getRepository(Product)
                .findAndCount({
                    where: [{
                        title: Like(`%${searchObject.title}%`), genderId,
                    }],
                    skip,
                    take: limit,
                });

            return {
                page,
                perPage: limit,
                itemCount,
                data: products,
            };
        }

        if (categoryId) {
            const [products, itemCount] = await getManager()
                .getRepository(Product)
                .findAndCount({
                    where: [{
                        title: Like(`%${searchObject.title}%`), genderCategoryId, categoryId, genderId,
                    }],
                    skip,
                    take: limit,
                });

            return {
                page,
                perPage: limit,
                itemCount,
                data: products,
            };
        }

        const [products, itemCount] = await getManager()
            .getRepository(Product)
            .findAndCount({
                where: [{ title: Like(`%${searchObject.title}%`), genderCategoryId, genderId }],
                skip,
                take: limit,
            });

        return {
            page,
            perPage: limit,
            itemCount,
            data: products,
        };
    }

    public async getProductByTitle(title: string): Promise<Product | undefined> {
        return getManager()
            .getRepository(Product)
            .findOne({ title });
    }

    public async getProductById(id: number): Promise<Product | undefined> {
        return getManager()
            .getRepository(Product)
            .findOne({ id });
    }

    public async createProduct(product: IProduct): Promise<Product> {
        return getManager()
            .getRepository(Product)
            .save(product);
    }

    public async deleteProductById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(Product)
            .delete({ id });
    }

    public async updateProductById(id: number, productDataToUpdate: Partial<IProduct>): Promise<UpdateResult> {
        return getManager()
            .getRepository(Product)
            .update({ id }, { ...productDataToUpdate });
    }
}

export const productRepository = new ProductRepository();
