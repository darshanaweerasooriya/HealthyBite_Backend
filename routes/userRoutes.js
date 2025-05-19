const express = require('express');
const router = express.Router();
const multer = require('multer');
const { register, login, getProfile} = require('../controllers/userControllers');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});
// const { protect } = require('../middleware/auth');

router.post('/',upload.single("profileImage"),register);
router.post('/login',login);
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username email profileImage'); // select only specific fields
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});





module.exports = router;