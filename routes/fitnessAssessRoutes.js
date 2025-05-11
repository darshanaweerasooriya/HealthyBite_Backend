const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { createAssessment, getLatestAssetment, getPlan } = require('../controllers/fitnessAssementController');
const router = express.Router();

router.post('/',authMiddleware,createAssessment);
router.get('/latest', authMiddleware,getLatestAssetment);
router.get('/plan', authMiddleware,getPlan);
module.exports = router;
