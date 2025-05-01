const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { bookAppointment, getUserAppointments, cancelAppointment, approveAppointment, getCoachAppoinments } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/book-appointment', authMiddleware, bookAppointment);
router.get('/my-appointments', authMiddleware, getUserAppointments);
router.put('/cancel-appointment/:id', authMiddleware, cancelAppointment);
router.put('/approve/:id', authMiddleware,approveAppointment);
router.get('/coach/my-appoinments', authMiddleware, getCoachAppoinments);
module.exports = router;