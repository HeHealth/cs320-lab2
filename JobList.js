import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [salarySearch, setSalarySearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const USStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
    };

    fetchData();
  }, []);

  const filteredJobs = jobs.filter(job => {
    return (
      job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (companySearch ? job.company.toLowerCase().includes(companySearch.toLowerCase()) : true) &&
      (salarySearch ? job.salaryRange.toLowerCase().includes(salarySearch.toLowerCase()) : true) &&
      (locationFilter ? job.location === locationFilter : true) &&
      (typeFilter ? job.jobType === typeFilter : true)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by job title..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by company..."
        value={companySearch}
        onChange={e => setCompanySearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by salary..."
        value={salarySearch}
        onChange={e => setSalarySearch(e.target.value)}
      />
      <select onChange={e => setLocationFilter(e.target.value)}>
        <option value="">All Locations</option>
        {USStates.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select onChange={e => setTypeFilter(e.target.value)}>
        <option value="">All Types</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
      </select>
      <ul>
        {filteredJobs.map(job => (
          <li key={job._id}>
            {job.title} - {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
