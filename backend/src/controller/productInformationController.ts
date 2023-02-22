import { NextFunction, Request, Response } from 'express';
import { productInformationService } from '../service';
import { IRequestExtended } from '../interface';
import { IProductInformation } from '../entity';

class ProductInformationController {
    public async getProductInformation(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productInformation = await productInformationService.getProductInformation(Number(req.params.id));

            res.json({ data: productInformation });
        } catch (e) {
            next(e);
        }
    }

    public async createProductInformation(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productInformation = await productInformationService.createProductInformation(req.body);

            res.json({ data: productInformation });
        } catch (e) {
            next(e);
        }
    }

    public async updateProductInformationById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.productInformation as IProductInformation;

            await productInformationService.updateProductInformationById(id, req.body);

            const productInformation = await productInformationService.getProductInformationById(id);

            res.json({ data: productInformation });
        } catch (e) {
            next(e);
        }
    }

    public async deleteProductInformationById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.productInformation as IProductInformation;

            await productInformationService.deleteProductInformationById(Number(id));

            res.json({ data: req.productInformation });
        } catch (e) {
            next(e);
        }
    }
}

export const productInformationController = new ProductInformationController();
