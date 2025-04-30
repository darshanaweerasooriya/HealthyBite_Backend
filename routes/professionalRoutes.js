const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createProfessionalAccount } = require('../controllers/professionalController');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/',upload.single("profileImage"),createProfessionalAccount);

module.exports = router;