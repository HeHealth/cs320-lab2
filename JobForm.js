import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    salaryRange: '',
    location: '',
    jobType: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postedBy = localStorage.getItem('userId');  // Retrieve the user ID from local storage
    if (!postedBy) {
      console.error("User not logged in");
      return;
    }
    await axios.post('http://localhost:5000/api/jobs', { ...jobData, postedBy });
    setJobData({
      title: '',
      company: '',
      salaryRange: '',
      location: '',
      jobType: '',
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={jobData.title}
        onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company"
        value={jobData.company}
        onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
      />
      <input
        type="text"
        placeholder="Salary Range"
        value={jobData.salaryRange}
        onChange={(e) => setJobData({ ...jobData, salaryRange: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={jobData.location}
        onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
      />
      <select
        value={jobData.jobType}
        onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}
      >
        <option value="" disabled>Select Job Type</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
      </select>
      <textarea
        placeholder="Description"
        value={jobData.description}
        onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
      ></textarea>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;
