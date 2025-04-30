const asyncHandler = require("express-async-handler");
const Appointment = require("../models/Appointments");
const { appointmentStatus } = require("../enums/enumList");

const bookAppointment = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { professionalId, date, time, notes  } = req.body;

        const existing = await Appointment.findOne({ professionalId, date, time, status:{$ne:appointmentStatus.Cancelled} });

        if(!existing){
            const appointment = new Appointment({
                userId,
                professionalId,
                date,
                time,
                notes
            });
            await appointment.save();
            res.status(201).json({ message: "Appointment booked", appointment });
        }
    } catch (error) {
        console.error("Failed to book appointment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const getUserAppointments = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;

        const appointments = await Appointment.find({ userId }).populate('professionalId', 'name type');
        res.status(200).json(appointments);
    } catch (error) {
        
    }

});

const cancelAppointment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = appointmentStatus.Cancelled;
    await appointment.save();
    res.status(200).json({ message: "Appointment cancelled" });
});

module.exports = { bookAppointment, getUserAppointments, cancelAppointment };