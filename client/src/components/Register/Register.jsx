import React, { useState } from 'react';
import './register.css'; 
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value} = e.target;
    const val = value;  // For handling checkbox
    setFormData({
      ...formData,
      [name]: val
    });
  };
  
  const navigate = useNavigate();

  const handleRegister = async() => {
    try {
        const response = await axios.post('http://localhost:8800/register', formData);
  
        if (response.status === 201) {
          console.log('Registration successful');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        
        <button type="submit" className="login-btn">Register</button>
        <p>Already have an Account?</p>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

