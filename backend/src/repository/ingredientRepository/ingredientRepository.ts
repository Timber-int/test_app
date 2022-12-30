import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { Ingredient } from '../../entity/ingredient';
import { IIngredientRepository } from './ingredientRepositoryInterface';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> implements IIngredientRepository {
    public async getAllIngredients(): Promise<Ingredient[]> {
        return getManager().getRepository(Ingredient).find({ relations: ['dishes'] });
    }

    public async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
        return getManager().getRepository(Ingredient).save(ingredient);
    }

    public async deleteIngredientById(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Ingredient).delete({ id });
    }

    public async getByIngredientName(name: string): Promise<Ingredient | undefined> {
        return getManager().getRepository(Ingredient).findOne({ name });
    }

    public async getByIngredientById(id: number): Promise<Ingredient | undefined> {
        return getManager().getRepository(Ingredient).findOne({ id });
    }
}

export const ingredientRepository = new IngredientRepository();
