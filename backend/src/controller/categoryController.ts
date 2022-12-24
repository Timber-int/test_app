import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../interface';
import { categoryService, fileService } from '../service';

class CategoryController {
    public async getAllCategories(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const category = await categoryService.getAllCategories();

            res.json({ category });
        } catch (e) {
            next(e);
        }
    }

    public async createCategory(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const photoData = req.files?.photo as UploadedFile;

            const photo = await fileService.saveFile(photoData, 'jpg');

            const category = await categoryService.createCategory({ ...req.body, photo });

            res.json({ category });
        } catch (e) {
            next(e);
        }
    }

    public async deleteCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const category = await categoryService.getCategoryById(Number(req.params.id));

            await categoryService.deleteCategoryById(Number(req.params.id));

            res.json({ category });
        } catch (e) {
            next(e);
        }
    }

    public async updateCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            let categoryPhotoPath;

            const photo = req.files?.photo as UploadedFile;

            if (photo) {
                categoryPhotoPath = await fileService.saveFile(photo, 'jpg');
            }

            await categoryService.updateCategoryById(Number(id),
                categoryPhotoPath
                    ? { ...req.body, photo: categoryPhotoPath } : { ...req.body });

            const category = await categoryService.getCategoryById(Number(id));

            res.json({ category });
        } catch (e) {
            next(e);
        }
    }
}

export const categoryController = new CategoryController();
