import Router from 'koa-router';
import userRouter from './UserRouter'
import driverRouter from './DriverRouter'
import authRouter from './AuthRouter';

const router = new Router();

router
    .use(authRouter)
    .use(userRouter)
    .use(driverRouter)

export default router.routes();
