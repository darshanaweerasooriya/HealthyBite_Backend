const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createProfessionalAccount, professionalLogin, getAvailableSlots, registerProfessional } = require('../controllers/professionalController');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/create', createProfessionalAccount);
router.post('/login',professionalLogin);
router.get('/:id/available-slots',getAvailableSlots)
router.post('/register',registerProfessional);
module.exports = router;