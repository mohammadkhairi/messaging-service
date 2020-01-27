'use strict'

module.exports = (io) => {
    io.sockets.on('connection', function (socket) {
        socket.on('rooms', function (parameters) {
            socket.username = parameters.username;
            socket.room = parameters.room;

            io.to(socket.room).emit('is_online', '<i>' + socket.username + ' join the chat..</i>');

            socket.join(socket.room, () => {
                socket.on('disconnect', function (username) {
                    io.to(socket.room).emit('is_online', '<i>' + socket.username + ' left the chat..</i>');
                })

                socket.on('chat_message', function (message) {
                    io.to(socket.room).emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
                });
            });
        });
    });
};
