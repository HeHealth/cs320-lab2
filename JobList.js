import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>{job.title} at {job.company}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
