import FirebaseCloudMessage from 'fcm-push';
import dotenv from 'dotenv';

dotenv.config();

class PushService extends FirebaseCloudMessage {

    constructor() {
        const { FCM_SERVER_KEY } = process.env;
        super(FCM_SERVER_KEY);
    }

    async sendPushNotification(to, context, data) {
        // const { to, context, data } = notificationData;

        switch (context) {
            case 'driverRequest':
                {
                    this.sendMessage(to, 'You have a new service', data)
                    break;
                }
            case 'driverResponse':
                {
                    if (data.accept) {
                        this.sendMessage(to, 'The driver has accepted', data)
                    } else {
                        this.sendMessage(to, 'The driver has declined', data)
                    }

                    break;
                }
            default:
                break;
        }
    }

    async sendMessage(token, title, body) {
        try {
            await this.send(this._generateNotificationObject(token, title, body))
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
