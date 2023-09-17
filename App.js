import React, { useEffect, useState } from 'react';
import './App.css';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import UserForm from './components/UserForm';
import axios from 'axios';

function App() {
  const [role, setRole] = useState('');
  const [refresh, setRefresh] = useState(false); // <-- Add this line

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');
      console.log("Token from Local Storage:", token);
      if (token) {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { 'x-auth-token': token }
        });
        setRole(response.data.role);
      }
    };

    fetchRole();
  }, [refresh]); // <-- Add refresh here

  const handleRefresh = () => { // <-- Add this function
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <h1>Job Portal</h1>
      <UserForm onTokenSet={handleRefresh} /> {/* <-- Pass handleRefresh here */}
      {role === 'employee' && (
        <>
          <h2>Employee Dashboard</h2>
          <JobList />
        </>
      )}
      {role === 'employer' && (
        <>
          <h2>Employer Dashboard</h2>
          <JobForm />
        </>
      )}
    </div>
  );
}

export default App;
