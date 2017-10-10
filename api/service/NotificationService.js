import User from '../model/User';
import UserService from '../service/UserService'
import PushService from '../service/PushService'

class NotificationService {
    async subscribeFCM(id, fcmToken) {
        try {
            if (fcmToken) {
                await UserService.updateUserByID(id, { fcmToken });
                return { success: true };
            }
            return { success: false };
        } catch (e) {
            throw e;
        }
    }

    async sendNotification(info, driverID) {
        try {
            const { id, data, context } = info;
            const user = await User.findById(id).select('fcmToken');
            if (user) {
                PushService.sendPushNotification(user.fcmToken, context, data)
                if (context === 'driverResponse' && data.accept) {
                    console.log("poniendo false" , driverID);
                    UserService.updateUserByID(driverID, { status: false }).then();
                }
                return { success: true };
            }
            return { success: false, InvalidUser: true };
        } catch (e) {
            throw e;
        }
    }
}

const notificationService = new NotificationService();

export default notificationService
