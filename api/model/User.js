import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs'
import uuidv4 from 'uuid/v4';
// import moment from 'moment'
// import validator from '../utils/Validator';

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true,
        // unique: true,
        default: uuidv4,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    fcmToken: {
        type: String,
    },
    socketID: {
        type: String,
    },
    userType: {
        type: String,
        enum: ['Taxista', 'Cliente'],
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    lat: {
        type: Number,
        default: 0,
    },
    lon: {
        type: Number,
        default: 0,
    },
    phone: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});

export default mongoose.model('User', UserSchema);
