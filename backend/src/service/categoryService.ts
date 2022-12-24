import {DeleteResult, UpdateResult} from 'typeorm';
import {ICategory} from '../entity';
import {categoryRepository} from '../repository';

class CategoryService {
    public async getAllCategories(): Promise<ICategory[]> {
        return categoryRepository.getAllCategories();
    }

    public async getCategoryByName(name: string): Promise<ICategory | undefined> {
        return categoryRepository.getCategoryByName(name);
    }

    public async createCategory(categoryBody: ICategory): Promise<ICategory> {
        return categoryRepository.createCategory(categoryBody);
    }

    public async updateCategoryById(id: number, categoryBodyToUpdate: Partial<ICategory>): Promise<UpdateResult> {
        return categoryRepository.updateCategoryById(id, categoryBodyToUpdate);
    }

    public async deleteCategoryById(id: number): Promise<DeleteResult> {
        return categoryRepository.deleteCategoryById(id);
    }

    public async getCategoryById(id: number): Promise<ICategory | undefined> {
        return categoryRepository.getCategoryById(id);
    }
}

export const categoryService = new CategoryService();
