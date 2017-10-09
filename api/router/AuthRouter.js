import Router from 'koa-router';
import authController from '../controller/AuthController';

const router = new Router({ prefix: '/auth' });

router.post('/login', authController.login)

export default router.routes();
