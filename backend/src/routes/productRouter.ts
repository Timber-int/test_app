import { Router } from 'express';
import { productController } from '../controller';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getAllProducts);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProductById);
router.put('/:id', productController.updateProductById);

export const productRouter = router;
