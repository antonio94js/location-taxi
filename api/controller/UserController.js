/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 *
 */
import User from '../model/User';
import PushService from '../service/PushService';
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

            if (fcmToken) {
                await User.findByIdAndUpdate(_id, { fcmToken });
                return ctx.body = { success: true };
            }

            ctx.body = { success: false };
        } catch (e) {
            return errorHandler(e, ctx);
        }
    }

    async sendNotification(ctx) {
        try {
            const { id, data, context } = ctx.request.body;
            const user = await User.findById(id).select('fcmToken');

            if (user) {
                PushService.sendPushNotification(user.fcmToken, context, data)
                return ctx.body = { success: true };
            }

            return ctx.body = { success: false, InvalidUser: true };
        } catch (e) {
            return errorHandler(e, ctx);
        }
    }
}

const userController = new UserController();
export default userController;
