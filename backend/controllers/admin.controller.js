const User = require('../models/User');
const Event = require('../models/Event');
const Notice = require('../models/Notice');

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalNotices = await Notice.countDocuments();
    res.json({
      totalUsers,
      totalEvents,
      totalNotices,
      activeRegistrations: 0 // Add logic if you have registrations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 