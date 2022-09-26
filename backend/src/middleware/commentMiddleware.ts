import { NextFunction, Request, Response } from 'express';
import { STATUS } from '../errorCode';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { productService } from '../service';

class CommentMiddleware {
    public async checkIsProductForCommentExist(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const id = req.body.productId;

            const product = await productService.getProductById(id);

            if (!product) {
                next(new ErrorHandler(MESSAGE.PRODUCT_IS_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
