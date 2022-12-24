import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { Category, ICategory } from '../../entity';
import { ICategoryRepository } from './categoryRepositoryInterface';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> implements ICategoryRepository {
    public async getAllCategories(): Promise<ICategory[]> {
        return getManager().getRepository(Category).find();
    }

    public async getCategoryByName(name: string): Promise<ICategory | undefined> {
        return getManager().getRepository(Category).findOne({ name });
    }

    public async createCategory(categoryBody: ICategory): Promise<ICategory> {
        return getManager().getRepository(Category).save(categoryBody);
    }

    public async updateCategoryById(id: number, categoryBodyToUpdate: Partial<ICategory>): Promise<UpdateResult> {
        return getManager().getRepository(Category).update({ id }, categoryBodyToUpdate);
    }

    public async deleteCategoryById(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Category).delete({ id });
    }

    public async getCategoryById(id: number): Promise<ICategory | undefined> {
        return getManager().getRepository(Category).findOne({ id });
    }
}

export const categoryRepository = new CategoryRepository();
