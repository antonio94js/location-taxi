/**
 * Passport Configuration
 *
 * * @description :: Passport will define which is going to be the authentication strategy
 * used by the application.
 *
 */
import passport from 'koa-passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import dotenv from 'dotenv';

import User from '../api/model/User';
import JwtService from '../api/service/JwtService';

dotenv.config();

const jwtOptions = {
    secretOrKey: process.env.SECRET_JWT_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const localOptions = {
    usernameField: 'user',
    passwordField: 'password',
    session: false,
}
/**
This will be used to validate that the user is Authenticated and he has a JWT token
**/
passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    if (payload) {
        return done(null, payload);
    }
    return done(new Error('Invalid token'), null);
}));

/**
This will be used to Authenticate the user and give a JWT token to him
**/
passport.use(new LocalStrategy(localOptions, async (user, password, done) => {
    if (!user || !password) {
        return done(null, false, {
            message: 'You must to provide all the login fields',
            InvalidFields: true,
        })
    }

    const userData = await User.findOne({ $or: [{ email: user }, { username: user }] })
                                .select('-fcmTokens -__v').lean(true);

    if (!userData || !bcrypt.compareSync(password, userData.password)) {
        return done(null, false, {
            message: 'The credentials are invalid, please check it out',
            InvalidCredentials: true,
            success: false,
        })
    }

    return done(null, {
        success: true,
        accessToken: JwtService.generateJWT(userData),
        user: userData,
        expirationTime: moment(new Date()).add(1, 'days').valueOf(),
    })
}))
