
const registerMessageHandler = require('./messageHandlers');

module.exports = function registerConnectionHandler(socket, io, onlineUsers) {
  socket.on('register', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  registerMessageHandler(socket, io, onlineUsers);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    for (const [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        break;
      }
    }
  });
};
