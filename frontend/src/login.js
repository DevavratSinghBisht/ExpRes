import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
        const apiUrl = "http://127.0.0.1:8000/userLogin";
        console.log('calling ? ',apiUrl);
        try {
            const response = await axios.post(apiUrl, {
                username: username,
                password: password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log('Response:', response.data);
        
            if (response.data.login_status === "Login successful") {
                localStorage.setItem("authToken", "someToken");
                localStorage.setItem("parentUsername", response.data.username);
                alert("Login successful!");
                navigate("/posts");
            } else {
                throw new Error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Error: " + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div style={styles.loginContainer}>
            <div style={styles.loginBox}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleLogin}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" style={styles.loginBtn}>Login</button>
                </form>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
    },
    loginBox: {
        backgroundColor: '#071E3D',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#fff',
    },
    inputGroup: {
        marginBottom: '25px',
    },
    label: {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#33bbf5',
    },
    input: {
        width: '92%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        outline: 'none',
    },
    inputFocus: {
        borderColor: '#0056b3',
        boxShadow: '0 0 5px rgba(0, 86, 179, 0.3)',
    },
    loginBtn: {
        width: '98%',
        padding: '10px',
        backgroundColor: '#0056b3',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    loginBtnHover: {
        backgroundColor: '#003f7d',
    },
};

export default Login;
