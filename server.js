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

// import User from './api/model/User';
// const io = socket.listen(server);
//
// io
//     .of('/taxi')
//     .on('connection', function(socket) {
//         socket.on('user:connected', (data) => {
//             console.log("user:connected");
//             if (data && data.userType === 'Cliente') {
//                 const { id } = data;
//                 User.findByIdAndUpdate(id, { socketID: socket.id }).then();
//             }
//         });
//         socket.on('driver:location', async (data) => {
//             console.log("driver:location");
//             const { id, lat, lon } = data;
//             console.log(id, lat, lon);
//             User.findByIdAndUpdate(id, { lat, lon }).then();
//         })
//         socket.on('driver:path', async (data) => {
//             console.log("driver:path");
//             const { id } = data;
//             const { socketID } = await User.findById(id).select('socketID')
//             socket.broadcast.to(socketID).emit('driver:location:path', data);
//         })
//         socket.on('finished:service', async (data) => {
//             console.log('finished:service');
//             const { id } = data;
//             User.findByIdAndUpdate(id, { status: false }).then();
//         })
//         socket.on('disconnect', function() {
//             console.log("desconectado");
//         });
//     });
