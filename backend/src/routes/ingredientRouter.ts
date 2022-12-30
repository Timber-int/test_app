import { Router } from 'express';
import { ingredientController } from '../controller';

const router = Router();

router.get('/', ingredientController.getAllIngredients);

export const ingredientRouter = router;
