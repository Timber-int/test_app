import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../interface';
import { dishService, fileService } from '../service';

class DishController {
    public async getAllCategories(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                page,
                perPage,
                ...other
            } = req.query;

            const { id } = req.params;
            console.log(id);

            const dishes = await dishService.getAllDishes(Number(id), other, Number(perPage), Number(page));

            res.json({ dishes });
        } catch (e) {
            next(e);
        }
    }

    public async createDish(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const photoData = req.files?.photo as UploadedFile;

            const photo = await fileService.saveFile(photoData, 'jpg');

            const dish = await dishService.createDish({ ...req.body, photo });

            res.json({ dish });
        } catch (e) {
            next(e);
        }
    }

    public async deleteDishById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const dish = await dishService.getDishById(Number(req.params.id));

            await dishService.deleteDishById(Number(req.params.id));

            res.json({ dish });
        } catch (e) {
            next(e);
        }
    }

    public async updateDishById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            let dishPhotoPath;

            const photo = req.files?.photo as UploadedFile;

            if (photo) {
                dishPhotoPath = await fileService.saveFile(photo, 'jpg');
            }

            await dishService.updateDishById(Number(id),
                dishPhotoPath
                    ? { ...req.body, photo: dishPhotoPath } : { ...req.body });

            const dish = await dishService.getDishById(Number(id));

            res.json({ dish });
        } catch (e) {
            next(e);
        }
    }
}

export const dishController = new DishController();
