const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { bookAppointment, getUserAppointments, cancelAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/book-appointment', authMiddleware, bookAppointment);
router.get('/my-appointments', authMiddleware, getUserAppointments);
router.put('/cancel-appointment/:id', authMiddleware, cancelAppointment);

module.exports = router;