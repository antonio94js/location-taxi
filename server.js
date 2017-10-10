import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import logger from 'koa-logger';
// import socket from 'socket.io';
import DBmanager from './config/db';
import mainRouter from './api/router';

import './config/passport';
import socket from './socket';

require('babel-core/register');
require('babel-polyfill');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3000;

router.use('/api/v1', mainRouter);

app
    .use(logger()) // Logger for koa
    .use(bodyParser()) // Body parser for koa
    .use(passport.initialize()) // Passport for koa
    .use(router.routes()) // Routers
    .use(router.allowedMethods());


const server = app.listen(port, () => {
    DBmanager.connectToDB();
    console.log(`Server lifted and listening port ${port}`);
})

socket(server);
