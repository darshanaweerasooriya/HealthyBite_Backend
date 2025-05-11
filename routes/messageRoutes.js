// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { authMiddleware } = require('../middleware/auth');


router.get('/:receiverId', authMiddleware, async (req, res) => {
  const { id: senderId } = req.user;
  const { receiverId } = req.params;

  const messages = await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId }
    ]
  }).sort({ timestamp: 1 });

  res.status(200).json(messages);
});

router.post('/:receiverId', authMiddleware, async (req, res) => {
  const { id: senderId } = req.user;
  const { receiverId } = req.params;
  const { text } = req.body;

  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      timestamp: new Date(),
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
