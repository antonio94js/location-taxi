import Router from 'koa-router';
import driverController from '../controller/DriverController';
import isAuthenticated from '../policies/isAuthenticated';

const router = new Router();

router.get('/drivers', isAuthenticated, driverController.findAll)

export default router.routes();
