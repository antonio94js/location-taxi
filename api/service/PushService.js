import FirebaseCloudMessage from 'fcm-push';
import dotenv from 'dotenv';

dotenv.config();

class PushService extends FirebaseCloudMessage {

    constructor() {
        const { FCM_SERVER_KEY } = process.env;
        super(FCM_SERVER_KEY);
    }

    async sendPushNotification(to, context, data) {
        let title = null;
        try {
            switch (context) {
                case 'driverRequest': {
                        title = 'new_service';
                        break;
                    }
                case 'driverResponse': {
                        if (data.accept) {
                            title = 'has_accepted';
                        } else {
                            title = 'has_declined';
                        }
                        break;
                    }
                default:
                    break;
            }
            const response = await this.sendMessage(to, title, data)
            return response;
        } catch (e) {
            return e;
        }
    }

    async sendMessage(token, title, body) {
        try {
            const NotificationObject = this._generateNotificationObject(token, title, body);
            await this.send(NotificationObject)
            return true;
        } catch (e) {
            return false;
        }
    }

    _generateNotificationObject(token, title, body) {
        return {
            to: token, // required fill with device token or topics
            notification: { title, body },
        }
    }
}

const pushNotificationService = new PushService();

export default pushNotificationService;
