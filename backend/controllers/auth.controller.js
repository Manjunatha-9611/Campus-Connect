const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};
// Register a new user
exports.register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Create new user
      const user = await User.create({
        name,
        email,
        password,
        role: role || 'student' // Default to student if not specified
      });
      
      if (user) {
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: generateToken(user._id)
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Login user
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check if user exists
      const user = await User.findOne({ email });
      
      if (user && (await user.matchPassword(password))) {
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: generateToken(user._id)
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get user profile
  exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update user profile
  exports.updateUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.department = req.body.department || user.department;
      user.rollNumber = req.body.rollNumber || user.rollNumber;
      user.year = req.body.year || user.year;
      user.semester = req.body.semester || user.semester;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get user activity overview
  exports.getUserActivity = async (req, res) => {
    try {
      const eventsAttended = await Event.countDocuments({ registrations: req.user._id });
      const upcomingEvents = await Event.countDocuments({ date: { $gt: new Date() } });
      // Add logic for noticesRead and certificates if you track them
      res.json({
        eventsAttended,
        noticesRead: 0, // Replace with real logic if available
        upcomingEvents,
        certificates: 0 // Replace with real logic if available
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };