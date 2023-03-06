import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import { fileService, productPhotoService } from '../service';
import { IRequestExtended } from '../interface';
import { IProductPhoto } from '../entity';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class ProductPhotoController {
    public async getAllProductPhotos(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productPhotos = await productPhotoService.getAllProductPhotos();

            res.json({ data: productPhotos });
        } catch (e) {
            next(e);
        }
    }

    public async createProductPhoto(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productPhotoElem = req.files?.photo as UploadedFile;

            const productPhotoPath = await fileService.saveFile(productPhotoElem, 'jpg');

            const productPhoto = await productPhotoService.createProductPhoto({
                ...req.body,
                photo: productPhotoPath,
            });

            res.json({ data: productPhoto });
        } catch (e) {
            next(e);
        }
    }

    public async deleteProductPhotoById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id, photo } = req.productPhoto as IProductPhoto;

            await fs.unlink(path.join(__dirname, '../', 'fileDirectory', 'photos', photo), (err) => {
                if (err) {
                    next(new ErrorHandler(MESSAGE.PHOTO_NOT_EXIST, STATUS.CODE_404));
                }
            });

            await productPhotoService.deleteProductPhotoById(Number(id));

            res.json({ data: req.productPhoto });
        } catch (e) {
            next(e);
        }
    }
}

export const productPhotoController = new ProductPhotoController();
