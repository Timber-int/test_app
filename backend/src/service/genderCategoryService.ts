import { DeleteResult } from 'typeorm';
import { GenderCategory, IGenderCategory } from '../entity';
import { genderCategoryRepository } from '../repository';

class GenderCategoryService {
    public async getAllGenderCategory(id:number): Promise<GenderCategory[]> {
        return genderCategoryRepository.getAllGenderCategory(id);
    }

    public async getGenderCategoryByTitle(title: string): Promise<GenderCategory | undefined> {
        return genderCategoryRepository.getGenderCategoryByTitle(title);
    }

    public async getGenderCategoryById(id: number): Promise<GenderCategory | undefined> {
        return genderCategoryRepository.getGenderCategoryById(id);
    }

    public async createGenderCategory(category: IGenderCategory): Promise<GenderCategory> {
        return genderCategoryRepository.createGenderCategory(category);
    }

    public async deleteGenderCategoryById(id: number): Promise<DeleteResult> {
        return genderCategoryRepository.deleteGenderCategoryById(id);
    }
}

export const genderCategoryService = new GenderCategoryService();
