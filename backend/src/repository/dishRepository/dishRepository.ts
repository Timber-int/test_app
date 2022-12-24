import {
    DeleteResult, EntityRepository, getManager, Like, Repository, UpdateResult,
} from 'typeorm';
import { Dish, IDish } from '../../entity';
import { IPaginationResponse } from '../../interface';
import { IDishRepository } from './dishRepositoryInterface';

@EntityRepository(Dish)
class DishRepository extends Repository<Dish> implements IDishRepository {
    public async getAllDishes(
        categoryId: number,
        searchObject: Partial<IDish>,
        limit: number = 1,
        page: number = 1,
    ): Promise<IPaginationResponse<IDish>> {
        const skip = limit * (page - 1);

        const [dishes, itemCount] = await getManager()
            .getRepository(Dish)
            .findAndCount({
                where: [{ name: Like(`%${searchObject.name}%`) }, { categoryId }],
                skip,
                take: limit,
            });

        return {
            page,
            perPage: limit,
            itemCount,
            data: dishes,
        };
    }

    public async getDishByName(name: string): Promise<IDish | undefined> {
        return getManager().getRepository(Dish).findOne({ name });
    }

    public async createDish(dishBody: IDish): Promise<IDish> {
        return getManager().getRepository(Dish).save(dishBody);
    }

    public async updateDishById(id: number, dishBodyToUpdate: Partial<IDish>): Promise<UpdateResult> {
        return getManager().getRepository(Dish).update({ id }, dishBodyToUpdate);
    }

    public async deleteDishById(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Dish).delete({ id });
    }

    public async getDishById(id: number): Promise<IDish | undefined> {
        return getManager().getRepository(Dish).findOne({ id });
    }
}

export const dishRepository = new DishRepository();
