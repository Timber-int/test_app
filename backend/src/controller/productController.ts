import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';
import path from 'path';
import { IRequestExtended } from '../interface';
import { fileService, productService } from '../service';
import { IProduct } from '../entity';
import { STATUS } from '../errorCode';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';

class ProductController {
    public async getAllProducts(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                id,
                page,
                perPage,
                ...other
            } = req.query;

            const {
                genderCategoryId,
            } = req.params;

            const products = await productService.getAllProducts(Number(id), Number(genderCategoryId), other, Number(perPage), Number(page));

            res.json({ products });
        } catch (e) {
            next(e);
        }
    }

    public async createProduct(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productPhoto = req.files?.photo as UploadedFile;

            const productPhotoPath = await fileService.saveFile(productPhoto, 'jpg');

            const product = await productService.createProduct({
                ...req.body,
                photo: productPhotoPath,
            });

            res.json({ product });
        } catch (e) {
            next(e);
        }
    }

    public async updateProductById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            let productPhotoPath;

            const productPhoto = req.files?.photo as UploadedFile;

            if (productPhoto) {
                productPhotoPath = await fileService.saveFile(productPhoto, 'jpg');
            }

            await productService.updateProductById(Number(id),
                productPhotoPath
                    ? { ...req.body, photo: productPhotoPath } : { ...req.body });

            const product = await productService.getProductById(Number(id));

            res.json({ product });
        } catch (e) {
            next(e);
        }
    }

    public async updateProductByIdSetDiscount(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productFromDB = req.product as IProduct;

            await productService.updateProductByIdSetDiscount(productFromDB, req.body);

            const product = await productService.getProductById(Number(id));

            res.json({ product });
        } catch (e) {
            next(e);
        }
    }

    public async deleteProductById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const product = req.product as IProduct;
            await fs.unlink(path.join(__dirname, '../', 'fileDirectory', 'photos', product.photo), (err) => {
                if (err) {
                    next(new ErrorHandler(MESSAGE.PHOTO_NOT_EXIST, STATUS.CODE_404));
                }
            });
            await productService.deleteProductById(Number(req.params.id));

            res.json({ product });
        } catch (e) {
            next(e);
        }
    }
}

export const productController = new ProductController();
