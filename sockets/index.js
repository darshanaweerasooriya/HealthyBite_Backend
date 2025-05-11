const socketIo = require('socket.io');
const registerConnectionHandler = require('./handlers/connectionHandlers');

const onlineUsers = new Map();

module.exports = function initSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);
    registerConnectionHandler(socket, io, onlineUsers);
  });
};
