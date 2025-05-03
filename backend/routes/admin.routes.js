const express = require('express');
const { getStats } = require('../controllers/admin.controller');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.get('/stats', protect, admin, getStats);

module.exports = router; 