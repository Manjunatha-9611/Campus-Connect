const express = require('express');
const { 
  getNotices, 
  getNoticeById, 
  createNotice, 
  updateNotice, 
  deleteNotice 
} = require('../controllers/notice.controller');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getNotices);
router.get('/:id', getNoticeById);
router.post('/', protect, admin, createNotice);
router.put('/:id', protect, admin, updateNotice);
router.delete('/:id', protect, admin, deleteNotice);

module.exports = router;