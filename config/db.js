/* eslint no-underscore-dangle:0 */

import mongoose from 'mongoose';
import { connection } from './data/connection';
import Promise from 'bluebird';

mongoose.Promise = Promise;

class DatabaseManager {
    connectToDB() {
        return mongoose.connect(this._getMongoString(), { useMongoClient: true }, (err, res) => {
            if (err) {
                throw err;
            } else {
                console.log('Connected to MongoDB successfully');
            }
        });
    }

    _getMongoString() {
        const getString = ({ user, pass, host, port, db }) => `mongodb://${user}:${pass}@${host}:${port}/${db}`;
        switch (process.env.NODE_ENV) {
            case 'development': {
                    return getString(connection.development)
                }
            case 'production': {
                    return getString(connection.development)
                }
            default: throw new Error('Invalid Env')

        }
    }

}

export default new DatabaseManager();
