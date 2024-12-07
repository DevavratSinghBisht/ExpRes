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
      localStorage.setItem("parentUsername", formData.username);
      const parentUsername = localStorage.getItem("parentUsername");
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
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white',
  };

  return (
    <div style={styles.container}>
      <div style={styles.registrationContainer}>
        <div style={styles.registrationBox}>
          <h2 style={styles.title}>Registration</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                style={inputStyle}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="firstName" style={styles.label}>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                style={inputStyle}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="lastName" style={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                style={inputStyle}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={inputStyle}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="contactNo" style={styles.label}>Contact Number</label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                placeholder="Contact Number (10 digits)"
                required
                style={inputStyle}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="dateOfBirth" style={styles.label}>Date of Birth</label>
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
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (min 8 chars, 1 special char)"
                required
                style={inputStyle}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password2" style={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                style={inputStyle}
              />
            </div>

            {errorMessage && (
              <p style={styles.error}>{errorMessage}</p>
            )}
            {successMessage && (
              <p style={styles.success}>{successMessage}</p>
            )}

            <button type="submit" style={styles.submitBtn}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '150vh',
    background: 'linear-gradient(to right, #1B1833, #00d2ff)', // Gradient background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'Arial, sans-serif',
    paddingTop: '60px',
  },
  registrationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    width: '1000px',
    marginTop: '-30px',
  },
  registrationBox: {
    backgroundColor: '#ffffff',
    padding: '38px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    transform: 'translateY(20px)',
    animation: 'fadeIn 1s ease-out forwards',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#001F3F',
    color: 'white',
    fontSize: '18px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  submitBtnHover: {
    background: '#155a9c',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    fontSize: '14px',
    textAlign: 'center',
  }
};

export default RegistrationForm;
