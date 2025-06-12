import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css'; 

const Login = () => {
  const [role, setRole] = useState('resident');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/${role}`);
  };

  return (
    <div>
      <h2>SwachaPatha Login</h2>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="dashboard">Admin</option>
        <option value="collector">Collector</option>
        <option value="supervisor">Supervisor</option>
        <option value="resident">Resident</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
