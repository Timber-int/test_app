import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { GenderCategory, IGenderCategory } from '../../entity';
import { IGenderCategoryRepository } from './genderCategoryRepositoryInterface';

@EntityRepository(GenderCategory)
class GenderCategoryRepository extends Repository<GenderCategory> implements IGenderCategoryRepository {
    public async getAllGenderCategory(id: number): Promise<GenderCategory[]> {
        return getManager()
            .getRepository(GenderCategory)
            .find({ where: { genderId: id } });
    }

    public async getGenderCategoryByTitle(title: string): Promise<GenderCategory | undefined> {
        return getManager()
            .getRepository(GenderCategory)
            .findOne({ title });
    }

    public async getGenderCategoryById(id: number): Promise<GenderCategory | undefined> {
        return getManager()
            .getRepository(GenderCategory)
            .findOne({ id }, { relations: ['category'] });
    }

    public async createGenderCategory(category: IGenderCategory): Promise<GenderCategory> {
        return getManager()
            .getRepository(GenderCategory)
            .save(category);
    }

    public async deleteGenderCategoryById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(GenderCategory)
            .delete({ id });
    }
}

export const genderCategoryRepository = new GenderCategoryRepository();
