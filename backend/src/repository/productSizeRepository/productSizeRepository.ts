import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { IProductSize, ProductSize } from '../../entity';
import { IProductSizeRepository } from './productSizeRepositoryInterface';

@EntityRepository(ProductSize)
class ProductSizeRepository extends Repository<ProductSize> implements IProductSizeRepository {
    public async getAllProductSizes(productId:number): Promise<ProductSize[]> {
        return getManager()
            .getRepository(ProductSize)
            .find({ where: { productId } });
    }

    public async getProductSizeById(id: number): Promise<ProductSize | undefined> {
        return getManager()
            .getRepository(ProductSize)
            .findOne({ id });
    }

    public async createProductSize(productSize: IProductSize): Promise<ProductSize> {
        return getManager()
            .getRepository(ProductSize)
            .save(productSize);
    }

    public async deleteProductSizeById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(ProductSize)
            .delete({ id });
    }
}

export const productSizeRepository = new ProductSizeRepository();
