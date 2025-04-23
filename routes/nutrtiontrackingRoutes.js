const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { addNutritionTracking, getDailyNutriotionSummary } = require("../controllers/nutrtiontrackingConrtoller");
const router = express.Router();

router.post("/add",authMiddleware,addNutritionTracking);
router.get("/summary/:date",authMiddleware,getDailyNutriotionSummary);

module.exports = router;