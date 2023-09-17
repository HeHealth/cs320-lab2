const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Add a job
router.post('/', async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.json(newJob);
});

module.exports = router;
