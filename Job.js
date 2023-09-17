const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  salaryRange: String,
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-Time', 'Part-Time'],
    required: true
  },
  description: {
    type: String
  },
  postedBy: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Job', jobSchema);

