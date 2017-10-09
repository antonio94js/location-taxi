/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 *
 */
import User from '../model/User';
import errorHandler from '../handler/ErrorHandler';

class DriverController {
    async findAll(ctx) {
        try {
            const drivers = await User.find({ userType: 'Taxista' })
                                      .select('-__v -address -password -fcmToken -username');
            ctx.body = drivers;
        } catch (e) {
            errorHandler(e, ctx);
        }
    }
}

export default new DriverController();
