const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { createContent, getAllContent, getContentById } = require("../controllers/nutritionContentController");
const router = express.Router();
const multer = require('multer');
const path = require('path');



const storage = multer.memoryStorage();

const upload = multer({storage:storage});

router.post('/', upload.array("mediaUrl",5), authMiddleware, createContent);
router.get('/all', authMiddleware, getAllContent);
router.get('/:id', authMiddleware, getContentById);

module.exports = router;