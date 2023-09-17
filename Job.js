const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  salaryRange: String,
  location: String,
  jobType: String,
  description: String,
  postedBy: String
});

module.exports = mongoose.model('Job', jobSchema);
