import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { IProductPhoto, ProductPhoto } from '../../entity';
import { IProductPhotoRepository } from './productPhotoRepositoryInterface';

@EntityRepository(ProductPhoto)
class ProductPhotoRepository extends Repository<ProductPhoto> implements IProductPhotoRepository {
    public async getAllProductPhotos(productId:number): Promise<ProductPhoto[]> {
        return getManager()
            .getRepository(ProductPhoto)
            .find({ where: { productId } });
    }

    public async getProductPhotoById(id: number): Promise<ProductPhoto | undefined> {
        return getManager()
            .getRepository(ProductPhoto)
            .findOne({ id });
    }

    public async createProductPhoto(productPhoto: IProductPhoto): Promise<ProductPhoto> {
        return getManager()
            .getRepository(ProductPhoto)
            .save(productPhoto);
    }

    public async deleteProductPhotoById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(ProductPhoto)
            .delete({ id });
    }
}

export const productPhotoRepository = new ProductPhotoRepository();
