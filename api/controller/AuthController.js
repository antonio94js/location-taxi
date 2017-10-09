import passport from 'koa-passport';

class AuthController {
    async login(ctx, next) {
        return passport.authenticate('local', (err, user, info) => {
            if (!user && info) {
                if (info.InvalidCredentials || info.InvalidFields) {
                    ctx.body = info;
                    return ctx;
                }
            }
            if (err) {
                ctx.status = 500
                ctx.body = err;
            } else {
                ctx.body = user;
            }
        })(ctx, next);
    }
}


export default new AuthController();
// "password": "123asd"
