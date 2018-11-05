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
module.exports = (io) => {
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

}