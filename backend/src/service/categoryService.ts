import { DeleteResult, UpdateResult } from 'typeorm';
import { ICategory } from '../entity';
import { categoryRepository } from '../repository';

class CategoryService {
    public async getAllCategories(): Promise<ICategory[]> {
        return categoryRepository.getAllCategories();
    }

    public async getCategoryByTitle(title: string): Promise<ICategory | undefined> {
        return categoryRepository.getCategoryByTitle(title);
    }

    public async getCategoryById(id: number): Promise<ICategory | undefined> {
        return categoryRepository.getCategoryById(id);
    }

    public async createCategory(category: ICategory): Promise<ICategory> {
        return categoryRepository.createCategory(category);
    }

    public async deleteCategoryById(id: number): Promise<DeleteResult> {
        return categoryRepository.deleteCategoryById(id);
    }

    public async updateCategoryById(id: number, categoryDataToUpdate: Partial<ICategory>): Promise<UpdateResult> {
        return categoryRepository.updateCategoryById(id, categoryDataToUpdate);
    }
}

export const categoryService = new CategoryService();
