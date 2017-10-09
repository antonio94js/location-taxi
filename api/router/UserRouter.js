import Router from 'koa-router';
import userController from '../controller/UserController';
import isAuthenticated from '../policies/isAuthenticated';

const router = new Router({ prefix: '/user' });

router
    .post('/register', userController.create)
    .put('/send/push', isAuthenticated, userController.sendNotification)
    .put('/subscribe/push', isAuthenticated, userController.subscribeFCM)

export default router.routes();
