const errorHandler = (error, ctx) => {
    switch (error.name) {
        case 'ValidationError': {
            ctx.status = 400;
            ctx.body = error
            break;
        }
        default: {
            ctx.status = 500;
            ctx.body = error
            break;
        }
    }
}

export default errorHandler;
