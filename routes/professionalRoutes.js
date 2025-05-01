const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createProfessionalAccount, professionalLogin, getAvailableSlots } = require('../controllers/professionalController');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/',upload.single("profileImage"),createProfessionalAccount);
router.post('/login',professionalLogin);
router.get('/:id/available-slots',getAvailableSlots);
module.exports = router;