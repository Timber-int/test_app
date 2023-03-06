import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { IProductSize, ProductSize } from '../../entity';
import { IProductSizeRepository } from './productSizeRepositoryInterface';

@EntityRepository(ProductSize)
class ProductSizeRepository extends Repository<ProductSize> implements IProductSizeRepository {
    public async getAllProductSizes(): Promise<ProductSize[]> {
        return getManager()
            .getRepository(ProductSize)
            .find();
    }

    public async getAllProductSizesByProductId(productId:number): Promise<ProductSize[]> {
        return getManager()
            .getRepository(ProductSize)
            .find({ where: { productId } });
    }

    public async getAllProductSizesByProductIdAndSize(productId:number, productSize:number): Promise<ProductSize|undefined> {
        return getManager()
            .getRepository(ProductSize)
            .findOne({ where: { productId, productSize } });
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
