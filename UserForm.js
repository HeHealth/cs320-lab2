import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onTokenSet }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? 'http://localhost:5000/api/users' : 'http://localhost:5000/api/users/signin';
    const response = await axios.post(url, userData);
    
    console.log("Entire Response:", response);
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);

    const token = response.headers['x-auth-token'] || response.headers['X-Auth-Token'];
    console.log("Token is", token);

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('userId', response.data._id);  // Save the user ID in local storage
      onTokenSet();
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
      {isSignUp && (
        <select
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        >
          <option value="" disabled>Select Role</option>
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select>
      )}
      <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </form>
  );
};

export default UserForm;
