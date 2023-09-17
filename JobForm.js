import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    salaryRange: '',
    location: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/jobs', jobData);
    setJobData({
      title: '',
      company: '',
      salaryRange: '',
      location: '',
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
      {/* Add more input fields here for company, salaryRange, and location */}
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;
