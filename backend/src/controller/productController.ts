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

    public async getProductById(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const product = await productService.getProductById(Number(req.params.id));

            res.json({ productData: product });
        } catch (e) {
            next(e);
        }
    }

    public async deleteProductById(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const product = await productService.getProductById(Number(req.params.id));

            await productService.deleteProductById(Number(req.params.id));

            res.json({ productData: product });
        } catch (e) {
            next(e);
        }
    }

    public async createProduct(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productData = req.body;

            const product = await productService.createProduct(productData);

            res.json({ productData: product });
        } catch (e) {
            next(e);
        }
    }

    public async updateProductById(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            await productService.updateProduct(Number(req.params.id), req.body);

            const productData = await productService.getProductById(Number(req.params.id));

            res.json({ productData });
        } catch (e) {
            next(e);
        }
    }
}

export const productController = new ProductController();
