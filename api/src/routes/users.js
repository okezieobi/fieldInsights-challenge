import userController from '../controllers/users';
import router from './router';
import userMiddleware from '../middleware/users';

router.post('/auth/signup', userMiddleware.signup(), userController.signUp.bind(userController));

export default router;
