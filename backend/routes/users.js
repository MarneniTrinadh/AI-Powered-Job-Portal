const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.get('/me', protect, async (req, res) => res.json(req.user));

router.put('/profile', protect, upload.single('resume'), async (req, res) => {
  try {
    const updateData = {};
    for (let key in req.body) {
      if (key.startsWith('profile.')) {
        const field = key.replace('profile.', '');
        if (field === 'education' || field === 'experience') {
          updateData[`profile.${field}`] = JSON.parse(req.body[key]);
        } else if (field === 'skills' || field === 'portfolioLinks') {
          updateData[`profile.${field}`] = req.body[key].split(',').map(s => s.trim());
        } else {
          updateData[`profile.${field}`] = req.body[key];
        }
      }
    }
    if (req.file) updateData['profile.resume'] = req.file.path;
    const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
