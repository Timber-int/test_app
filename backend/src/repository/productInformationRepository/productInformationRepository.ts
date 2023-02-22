import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IProductInformation, ProductInformation } from '../../entity';
import { IProductInformationRepository } from './productInformationRepositoryInterface';

@EntityRepository(ProductInformation)
class ProductInformationRepository extends Repository<ProductInformation> implements IProductInformationRepository {
    public async getProductInformation(id: number): Promise<IProductInformation | undefined> {
        return getManager()
            .getRepository(ProductInformation)
            .findOne({ productId: id });
    }

    public async getProductInformationById(id: number): Promise<ProductInformation | undefined> {
        return getManager()
            .getRepository(ProductInformation)
            .findOne({ id });
    }

    public async createProductInformation(productInformation: IProductInformation): Promise<ProductInformation> {
        return getManager()
            .getRepository(ProductInformation)
            .save(productInformation);
    }

    public async deleteProductInformationById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(ProductInformation)
            .delete({ id });
    }

    public async updateProductInformationById(id: number, productInformationDataToUpdate: Partial<ProductInformation>): Promise<UpdateResult> {
        return getManager()
            .getRepository(ProductInformation)
            .update({ id }, { ...productInformationDataToUpdate });
    }
}

export const productInformationRepository = new ProductInformationRepository();
