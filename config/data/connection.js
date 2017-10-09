import dotenv from 'dotenv';

dotenv.config();

export const connection = {
    // localhost: {
    //     host: process.env.MONGO_HOST_DEV,
    //     port: process.env.MONGO_PORT_DEV,
    //     user: process.env.MONGO_USER,
    //     password: process.env.MONGO_PASS_DEV,
    //     database: process.env.MONGO_DB_DEV,
    // },
    development: {
        host: process.env.MONGO_HOST_DEV,
        port: process.env.MONGO_PORT_DEV,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS_DEV,
        db: process.env.MONGO_DB_DEV,
    },
    production: {
        host: process.env.MONGO_HOST_DEV,
        port: process.env.MONGO_PORT_DEV,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS_DEV,
        db: process.env.MONGO_DB_DEV,
    },
}


export default connection;
