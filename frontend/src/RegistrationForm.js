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

  const validateDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDate());
    return inputDate >= minDate && inputDate <= currentDate;
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    console.log('Inside validate Password');
    return password.length >= minLength && specialCharRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateOfBirth') {
      if (!validateDate(value)) {
        setErrorMessage("Please enter a valid date of birth (between 120 years ago and today).");
      } else {
        setErrorMessage('');
      }
    } else if (name === 'password') {
      if (!validatePassword(value)) {
        setErrorMessage("Password must be at least 8 characters long and contain at least 1 special character.");
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage('');
    }
    setFormData({ ...formData, [name]: value });
  };

  const userRegistration = async (userData) => {
    try {
      console.log('userdata');
      const response = await axios.post('http://127.0.0.1:8000/userRegister', userData);
      console.log('response data');
      return response.data;
    } catch (error) {
      console.log('error ', error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setErrorMessage("Password must be at least 8 characters long and contain at least 1 special character.");
      return;
    }
    if (formData.password !== formData.password2) {
      console.log('this is the error from frontend');
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!validateDate(formData.dateOfBirth)) {
      setErrorMessage("Please enter a valid date of birth.");
      return;
    }

    try {
      const result = userRegistration(formData);
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
    backgroundColor: 'white'
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(147, 112, 219, 0.15)',
      backgroundColor: '#F8F4FF',
      backgroundImage: 'linear-gradient(rgba(199, 21, 133, 0.03), rgba(147, 112, 219, 0.03))'
    }}>
      <h2 style={{
        textAlign: 'center',
        background: 'linear-gradient(to right, #C71585, #9370DB)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '25px',
        fontSize: '28px',
        fontWeight: '600'
      }}>Registration</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#C71585';
            e.target.style.boxShadow = '0 0 0 2px rgba(199, 21, 133, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#9370DB';
            e.target.style.boxShadow = 'none';
          }}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#C71585';
            e.target.style.boxShadow = '0 0 0 2px rgba(199, 21, 133, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#9370DB';
            e.target.style.boxShadow = 'none';
          }}
        />

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          min={`${new Date().getFullYear() - 120}-01-01`}
          max={new Date().toISOString().split('T')[0]}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#C71585';
            e.target.style.boxShadow = '0 0 0 2px rgba(199, 21, 133, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#9370DB';
            e.target.style.boxShadow = 'none';
          }}
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password (min 8 chars, 1 special char)"
          required
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#C71585';
            e.target.style.boxShadow = '0 0 0 2px rgba(199, 21, 133, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#9370DB';
            e.target.style.boxShadow = 'none';
          }}
        />

        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#C71585';
            e.target.style.boxShadow = '0 0 0 2px rgba(199, 21, 133, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#9370DB';
            e.target.style.boxShadow = 'none';
          }}
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
            background: 'linear-gradient(to right, #C71585, #9370DB)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'transform 0.2s, box-shadow 0.2s',
            marginTop: '10px',
            boxShadow: '0 2px 8px rgba(199, 21, 133, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(199, 21, 133, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(199, 21, 133, 0.2)';
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;