import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';
import path from 'path';
import { categoryService, fileService } from '../service';
import { IRequestExtended } from '../interface';
import { ICategory } from '../entity';
import { PhotoFormat } from '../constants';

class CategoryController {
    public async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const categories = await categoryService.getAllCategories(Number(req.params.id));

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
            const categoryPhoto = req.files?.photo as UploadedFile;

            const categoryFilePath = await fileService.saveFile(categoryPhoto, PhotoFormat.jpg);

            const category = await categoryService.createCategory({
                ...req.body,
                photo: categoryFilePath,
            });

            res.json({ data: category });
        } catch (e) {
            next(e);
        }
    }

    public async updateCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id, photo } = req.category as ICategory;

            const categoryPhoto = req.files?.photo as UploadedFile;

            let categoryFilePath;

            if (categoryPhoto) {
                await fs.unlink(path.join(__dirname, '../', 'fileDirectory', 'photos', photo), ((err) => {
                    if (err) {
                        res.json({ msg: err?.message });
                    }
                }));
                categoryFilePath = await fileService.saveFile(categoryPhoto, PhotoFormat.jpg);
            }

            await categoryService.updateCategoryById(id, categoryPhoto ? {
                ...req.body,
                photo: categoryFilePath,
            } : { ...req.body });

            const category = await categoryService.getCategoryById(id);

            res.json({ data: category });
        } catch (e) {
            next(e);
        }
    }

    public async deleteCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id, photo } = req.category as ICategory;

            await categoryService.deleteCategoryById(Number(id));

            await fs.unlink(path.join(__dirname, '../', 'fileDirectory', 'photos', photo), ((err) => {
                if (err) {
                    res.json({ msg: err?.message });
                }
            }));

            res.json({ data: req.category });
        } catch (e) {
            next(e);
        }
    }
}

export const categoryController = new CategoryController();
