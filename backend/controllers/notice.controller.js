const Notice = require('../models/Notice');

// Get all notices
exports.getNotices = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    const notices = await Notice.find(query).sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get notice by ID
exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    
    if (notice) {
      res.json(notice);
    } else {
      res.status(404).json({ message: 'Notice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new notice (admin only)
exports.createNotice = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const notice = await Notice.create({
      title,
      content,
      category,
      createdBy: req.user._id
    });
    
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a notice (admin only)
exports.updateNotice = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    notice.title = title || notice.title;
    notice.content = content || notice.content;
    notice.category = category || notice.category;
    
    const updatedNotice = await notice.save();
    res.json(updatedNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a notice (admin only)
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    await notice.remove();
    res.json({ message: 'Notice removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
