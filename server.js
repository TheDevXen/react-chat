const express = require('express');
const app = express();


const server = require('http').createServer(app);
const io = require('socket.io')(server);
const SOCKET_PORT = process.env.PORT || 3001;

server.listen(SOCKET_PORT, () => {
    console.log('Server listening at port %d', SOCKET_PORT);
});
const ROOMS_LIST = {
    'test': {
        title: 'Testing World',
        user_count: 2
    },
    'xensdev': {
        title: 'XensDev',
        user_count: 72
    },
    'developers': {
        title: 'The Developers',
        user_count: 91
    },
    'testing place': {
        title: 'Testing Place',
        user_count: 24
    },
    'lololo': {
        title: 'Testing World',
        user_count: 28
    },

}
io.on('connection', (socket) => {
    console.log('new incoming connection')
    socket.emit('room list', ROOMS_LIST)
    ROOMS_LIST['tester'] = {
        title: 'Tester',
        user_count: 100
    }
    setTimeout(() => {
        socket.emit('room list', ROOMS_LIST)
    }, 2000);
    socket.on('message', (data) => {
        console.log(data)
        io.emit('message', data);
    })
});

