const express = require('express');
const Job = require('../models/Job');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).populate('company', 'name');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user._id, company: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('company', 'name email company');
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
