const Message = require("../../models/Message");


module.exports = function registerMessageHandler(socket, io, onlineUsers) {
  socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
    const message = new Message({ senderId, receiverId, text });
    await message.save();

    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', {
        senderId,
        text,
        timestamp: message.timestamp
      });
    }
  });
};
