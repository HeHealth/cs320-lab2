import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onTokenSet }) => { // <-- Add onTokenSet here
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/users', userData);
    console.log("Entire Response:", response);
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);

    // Check if the token exists in the headers
    const token = response.headers['x-auth-token'] || response.headers['X-Auth-Token'];
    console.log("Token is", token);

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', response.data.role);
      onTokenSet(); // <-- Add this line
    } else {
      console.log("Token is undefined");
    }

    setUserData({
      username: '',
      password: '',
      role: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <select
        value={userData.role}
        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
      >
        <option value="" disabled>Select Role</option>
        <option value="employee">Employee</option>
        <option value="employer">Employer</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default UserForm;
