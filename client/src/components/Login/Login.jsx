import React, { useState } from 'react';
import './login.css'; 
import {useNavigate} from "react-router-dom"

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate()

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setLoggedIn(true);
      alert('Login successful!');
      navigate("/admin")
    } else {
      alert('Invalid username or password!');
    }
  };

  return (


    <div className="login-container">
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      
      <button type="submit" className="login-btn">Login</button>
    </form>
  </div>
  );
};
