/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 *
 */
import User from '../model/User';
import NotificationService from '../service/NotificationService';
import errorHandler from '../handler/ErrorHandler';

class UserController {
    async create(ctx) {
        try {
            const data = ctx.request.body
            await User.create(data);
            ctx.status = 201;
            ctx.body = { success: true, message: 'User created successfully' }
        } catch (e) {
            if (e.code === 11000 || e.code === 11001) {
                return ctx.body = { success: false, UserAlreadyExist: true, message: 'The user already exist' }
            }
            errorHandler(e, ctx);
        }
    }

    async subscribeFCM(ctx) {
        try {
            const { _id } = ctx.state.user;
            const { fcmToken } = ctx.request.body
            ctx.body = await NotificationService.subscribeFCM(_id, fcmToken)
        } catch (e) {
            return errorHandler(e, ctx);
        }
    }

    async sendNotification(ctx) {
        try {
            console.log(ctx.state.user);
            ctx.body = await NotificationService.sendNotification(ctx.request.body, ctx.state.user._id)
        } catch (e) {
            return errorHandler(e, ctx);
        }
    }
}

const userController = new UserController();
export default userController;
