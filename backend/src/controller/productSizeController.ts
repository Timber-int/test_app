import { NextFunction, Request, Response } from 'express';
import { productSizeService } from '../service';
import { IRequestExtended } from '../interface';
import { IProductSize } from '../entity';

class ProductSizeController {
    public async getAllProductSizes(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productSizes = await productSizeService.getAllProductSizes(Number(req.params.id));

            res.json({ data: productSizes });
        } catch (e) {
            next(e);
        }
    }

    public async createProductSize(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productSize = await productSizeService.createProductSize(req.body);

            res.json({ data: productSize });
        } catch (e) {
            next(e);
        }
    }

    public async deleteProductSizeById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.productSize as IProductSize;

            await productSizeService.deleteProductSizeById(Number(id));

            res.json({ data: req.productSize });
        } catch (e) {
            next(e);
        }
    }
}

export const productSizeController = new ProductSizeController();
