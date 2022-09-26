import { NextFunction, Request, Response } from 'express';
import { productService } from '../service';

class ProductController {
    public async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const products = await productService.getAllProducts();

            res.json({ productsData: products });
        } catch (e) {
            next(e);
        }
    }

    public async createProduct(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            console.log(req.body);

            const productData = req.body;

            const product = await productService.createProduct(productData);

            res.json({ productData: product });
        } catch (e) {
            next(e);
        }
    }

    // public async updateProduct(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
    //     try {
    //         const products = await productService.updateProduct();
    //
    //         res.json(products);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export const productController = new ProductController();
