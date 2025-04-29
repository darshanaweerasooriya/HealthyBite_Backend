const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { addProgressLog, getProgressLog } = require("../controllers/ProgressLogController");
const router = express.Router();

router.post("/log",authMiddleware, addProgressLog);
router.get('/logs', authMiddleware, getProgressLog);

module.exports = router;