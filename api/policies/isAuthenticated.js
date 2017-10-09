import passport from 'koa-passport';

const isAuthenticated = (ctx, next) => {
    return passport.authenticate('jwt', async (err, user, info) => {
        if (info && info.name === 'TokenExpiredError') {
            ctx.status = 401;
            return ctx.body = {
                status: 'error',
                message: 'The Authentication token has expired',
            };
        }

        if (info && info.name === 'JsonWebTokenError') {
            ctx.status = 401;
            return ctx.body = {
                status: 'error',
                message: 'The Authentication token is invalid',
            };
        }
        if (info) {
            ctx.status = 401;
            return ctx.body = {
                status: 'error',
                message: 'Invalid token, Format is Authorization: Bearer [token]',
            };
        }
        if (err) {
            ctx.status = 500;
            return ctx.body = err;
        }
        ctx.state.user = user;
        await next();
    })(ctx, next);
}

export default isAuthenticated;
