import { DeleteResult } from 'typeorm';
import { Ingredient } from '../entity/ingredient';
import { ingredientRepository } from '../repository';

export class IngredientService {
    public async getAllIngredients(): Promise<Ingredient[]> {
        return ingredientRepository.getAllIngredients();
    }

    public async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
        return ingredientRepository.createIngredient(ingredient);
    }

    public async deleteIngredientById(id: number): Promise<DeleteResult> {
        return ingredientRepository.deleteIngredientById(id);
    }

    public async getByIngredientName(name: string): Promise<Ingredient | undefined> {
        return ingredientRepository.getByIngredientName(name);
    }

    public async getByIngredientById(id: number): Promise<Ingredient | undefined> {
        return ingredientRepository.getByIngredientById(id);
    }
}

export const ingredientService = new IngredientService();
