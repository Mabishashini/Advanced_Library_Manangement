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
    <div className="login_container">
      {loggedIn ? (
        console.log("Welcome Admin!")
      ) : (
        <div className="login-form">
          Admin Login
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};
