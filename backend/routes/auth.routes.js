const express = require('express');
const { register, login, getUserProfile, updateUserProfile, getUserActivity } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/activity', protect, getUserActivity);

module.exports = router;