import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { Category, ICategory } from '../../entity';
import { ICategoryRepository } from './categoryRepositoryInterface';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> implements ICategoryRepository {
    public async getAllCategories(id:number): Promise<Category[]> {
        return getManager()
            .getRepository(Category)
            .find({ where: { genderId: id } });
    }

    public async getCategoryByTitle(title: string): Promise<Category | undefined> {
        return getManager()
            .getRepository(Category)
            .findOne({ title });
    }

    public async getCategoryById(id: number): Promise<Category | undefined> {
        return getManager()
            .getRepository(Category)
            .findOne({ id });
    }

    public async createCategory(category: ICategory): Promise<Category> {
        return getManager()
            .getRepository(Category)
            .save(category);
    }

    public async deleteCategoryById(id: number): Promise<DeleteResult> {
        return getManager()
            .getRepository(Category)
            .delete({ id });
    }

    public async updateCategoryById(id: number, categoryDataToUpdate: Partial<ICategory>): Promise<UpdateResult> {
        return getManager()
            .getRepository(Category)
            .update({ id }, { ...categoryDataToUpdate });
    }
}

export const categoryRepository = new CategoryRepository();
