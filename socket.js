import socket from 'socket.io';
import User from './api/model/User';

const socketLogic = (server) => {
    const io = socket.listen(server);
    io
        .of('/taxi')
        .on('connection', function(socket) {
            socket.on('user:connected', (data) => {
                // console.log("user:connected");
                if (data && data.userType === 'Cliente') {
                    const { id } = data;
                    User.findByIdAndUpdate(id, { socketID: socket.id }).then();
                }
            });
            socket.on('driver:location', async (data) => {
                // console.log("driver:location");
                const { id, lat, lon } = data;
                console.log(id, lat, lon);
                User.findByIdAndUpdate(id, { lat, lon }).then();
            })
            socket.on('driver:path', async (data) => {
                // console.log("driver:path");
                const { id } = data;
                const { socketID } = await User.findById(id).select('socketID')
                socket.broadcast.to(socketID).emit('driver:location:path', data);
            })
            socket.on('finished:service', async (data) => {
                // console.log('finished:service');
                const { id } = data;
                User.findByIdAndUpdate(id, { status: true }).then();
            })
            socket.on('disconnect', function() {
                // console.log("desconectado");
            });
        });
}

export default socketLogic;
