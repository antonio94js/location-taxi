import FCM from 'fcm-push';
import dotenv from 'dotenv';

dotenv.config();

const { FCM_SERVER_KEY } = process.env;

export const fcm = new FCM(FCM_SERVER_KEY);
