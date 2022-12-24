import { DeleteResult, UpdateResult } from 'typeorm';
import { IDish } from '../entity';
import { IPaginationResponse } from '../interface';
import { dishRepository } from '../repository';

class DishService {
    public async getAllDishes(categoryId: number, filterObject: Partial<IDish>, perPage: number, page: number): Promise<IPaginationResponse<IDish>> {
        return dishRepository.getAllDishes(categoryId, filterObject, perPage, page);
    }

    public async getDishByName(name: string): Promise<IDish | undefined> {
        return dishRepository.getDishByName(name);
    }

    public async createDish(dishBody: IDish): Promise<IDish> {
        return dishRepository.createDish(dishBody);
    }

    public async updateDishById(id: number, dishBodyToUpdate: Partial<IDish>): Promise<UpdateResult> {
        return dishRepository.updateDishById(id, dishBodyToUpdate);
    }

    public async deleteDishById(id: number): Promise<DeleteResult> {
        return dishRepository.deleteDishById(id);
    }

    public async getDishById(id: number): Promise<IDish | undefined> {
        return dishRepository.getDishById(id);
    }
}

export const dishService = new DishService();
