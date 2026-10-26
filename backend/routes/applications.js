const express = require('express');
const Application = require('../models/Application');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, authorize('candidate'), async (req, res) => {
  try {
    const application = await Application.create({ ...req.body, candidate: req.user._id });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-applications', protect, async (req, res) => {
  try {
    let applications;
    if (req.user.role === 'candidate') {
      applications = await Application.find({ candidate: req.user._id }).populate('job');
    } else {
      applications = await Application.find().populate('job').populate('candidate');
    }
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/job/:jobId', protect, async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId }).populate('candidate');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', protect, async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
