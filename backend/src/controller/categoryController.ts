import { NextFunction, Request, Response } from 'express';
import { categoryService } from '../service';
import { IRequestExtended } from '../interface';
import { ICategory } from '../entity';

class CategoryController {
    public async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const categories = await categoryService.getAllCategories();

            res.json({ data: categories });
        } catch (e) {
            next(e);
        }
    }

    public async getCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const category = await categoryService.getCategoryById(Number(id));

            res.json({ data: category });
        } catch (e) {
            next(e);
        }
    }

    public async createCategory(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const category = await categoryService.createCategory(req.body);

            res.json({ data: category });
        } catch (e) {
            next(e);
        }
    }

    public async updateCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.category as ICategory;

            await categoryService.updateCategoryById(id, req.body);

            const category = await categoryService.getCategoryById(id);

            res.json({ data: category });
        } catch (e) {
            next(e);
        }
    }

    public async deleteCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.category as ICategory;

            await categoryService.deleteCategoryById(Number(id));

            res.json({ data: req.category });
        } catch (e) {
            next(e);
        }
    }
}

export const categoryController = new CategoryController();
