import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import logger from 'koa-logger';
import socket from 'socket.io';
import DBmanager from './config/db';
import mainRouter from './api/router';

import './config/passport';

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

import User from './api/model/User';

const io = socket(server);

io
    .of('/taxi')
    .on('connection', function(socket) {
        socket.on('user:connected', (data) => {
            if (data && data.userType === 'Cliente') {
                const { id } = data;
                User.findByIdAndUpdate(id, { socketID: socket.id })
            }
        });
        socket.on('driver:location', (data) => {
            const { id, lat, lon } = data;
            User.findByIdAndUpdate(id, { lat, lon })
        })
        socket.on('driver:path', async (data) => {
            const { id } = data;
            const { socketID } = await User.findById(id).select('socketID')
            socket.broadcast.to(socketID).emit('driver:location:path', data);
        })
        socket.on('disconnect', function() {

        });
    });
