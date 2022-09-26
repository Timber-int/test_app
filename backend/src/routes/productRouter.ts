import { Router } from 'express';
import { productController } from '../controller';

const router = Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

export const productRouter = router;
