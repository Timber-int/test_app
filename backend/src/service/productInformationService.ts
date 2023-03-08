import { DeleteResult, UpdateResult } from 'typeorm';
import { IProductInformation, ProductInformation } from '../entity';
import { productInformationRepository } from '../repository';

class ProductInformationService {
    public async getProductInformation(id: number): Promise<IProductInformation | undefined> {
        return productInformationRepository.getProductInformation(id);
    }

    public async getProductInformationById(id: number): Promise<ProductInformation | undefined> {
        return productInformationRepository.getProductInformationById(id);
    }

    public async getProductInformationByProductId(productId: number): Promise<ProductInformation | undefined> {
        return productInformationRepository.getProductInformationByProductId(productId);
    }

    public async createProductInformation(productInformation: IProductInformation): Promise<ProductInformation> {
        return productInformationRepository.createProductInformation(productInformation);
    }

    public async deleteProductInformationById(id: number): Promise<DeleteResult> {
        return productInformationRepository.deleteProductInformationById(id);
    }

    public async updateProductInformationById(id: number, productInformationDataToUpdate: Partial<ProductInformation>): Promise<UpdateResult> {
        return productInformationRepository.updateProductInformationById(id, productInformationDataToUpdate);
    }
}

export const productInformationService = new ProductInformationService();
