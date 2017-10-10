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
                return ctx.body = err;
            }
            ctx.body = user;
        })(ctx, next);
    }
}

const authController = new AuthController();
export default authController;
