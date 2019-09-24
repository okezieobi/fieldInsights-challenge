import productController from '../controllers/products';
import productMiddleware from '../middleware/products';
import router from './router';

router.post('/products', productMiddleware.create(), productController.create.bind(productController));

export default router;
