import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    dateOfBirth: '',
    contactNo: '',
    email: '',
    password: '',
    password2: '',
    profilePicture: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  // const parentUsername = localStorage.getItem("username");
  const validateContactNumber = (contactNo) => {
    const regex = /^\d{10}$/;
    return regex.test(contactNo);
  };

  const validateDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDate());
    return inputDate >= minDate && inputDate <= currentDate;
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return password.length >= minLength && specialCharRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contactNo' && !validateContactNumber(value)) {
      setErrorMessage("Contact number must be 10 digits.");
    } else if (name === 'dateOfBirth' && !validateDate(value)) {
      setErrorMessage("Please enter a valid date of birth (between 120 years ago and today).");
    } else if (name === 'password' && !validatePassword(value)) {
      setErrorMessage("Password must be at least 8 characters long and contain at least 1 special character.");
    } else {
      setErrorMessage('');
    }
    setFormData({ ...formData, [name]: value });
  };

  const userRegistration = async (userData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/userRegister', userData);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setErrorMessage("Password must be at least 8 characters long and contain at least 1 special character.");
      return;
    }
    if (formData.password !== formData.password2) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!validateDate(formData.dateOfBirth)) {
      setErrorMessage("Please enter a valid date of birth.");
      return;
    }
    if (!validateContactNumber(formData.contactNo)) {
      setErrorMessage("Please enter a valid 10-digit contact number.");
      return;
    }

    try {
      const result = await userRegistration(formData);
      localStorage.setItem("username", formData.username);
      const parentUsername = localStorage.getItem("username");
      console.log('Updated parentUsername: ', parentUsername);
      setSuccessMessage('Registration successful!');
      setErrorMessage('');
      setTimeout(() => {
        navigate('/posts');
      }, 1000);
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const inputStyle = {
    padding: '12px 16px',
    borderRadius: '25px',
    border: '1px solid #9370DB',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white',
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(147, 112, 219, 0.15)',
      backgroundColor: '#071E3D',
    }}>
      <h2 style={{
        textAlign: 'center',
        color: 'white',
        marginBottom: '25px',
        fontSize: '28px',
        fontWeight: '600'
      }}>Registration</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ color: '#2ebff0', fontSize: '16px' }} htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          style={inputStyle}
        />

        <label style={{ color: '#2ebff0', fontSize: '16px' }} htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          style={inputStyle}
        />

        <label style={{ color: '#2ebff0', fontSize: '16px' }} htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          style={inputStyle}
        />

        <label style={{ color: '#2ebff0', fontSize: '16px' }} htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={inputStyle}
        />

        <label style={{ color: '#2ebff0', fontSize: '16px' }} htmlFor="contactNo">Contact Number</label>
        <input
          type="text"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          placeholder="Contact Number (10 digits)"
          required
          style={inputStyle}
        />

        <label style={{ color: '#2ebff0', fontSize: '16px' }} htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          min={`${new Date().getFullYear() - 120}-01-01`}
          max={new Date().toISOString().split('T')[0]}
          style={inputStyle}
        />

        <label style={{ color: '#2ebff0', fontSize: '16px' }} htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password (min 8 chars, 1 special char)"
          required
          style={inputStyle}
        />

        <label style={{ color: '#2ebff0', fontSize: '16px' }} htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          style={inputStyle}
        />

        {errorMessage && (
          <p style={{
            color: '#C71585',
            textAlign: 'center',
            margin: '5px 0',
            fontSize: '14px'
          }}>{errorMessage}</p>
        )}
        {successMessage && (
          <p style={{
            color: '#9370DB',
            textAlign: 'center',
            margin: '5px 0',
            fontSize: '14px'
          }}>{successMessage}</p>
        )}

        <button
          type="submit"
          style={{
            padding: '14px',
            borderRadius: '25px',
            background: '#168af0',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
