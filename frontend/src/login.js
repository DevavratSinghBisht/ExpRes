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
        console.log('calling ? ', apiUrl);
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
                console.log("The current user is : ", response.data.username);
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
        <div style={styles.container}>
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
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        height: '100vh',
        background: 'linear-gradient(to right, #1B1833, #00d2ff)',  // Gradient background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        width:'1000px',
        marginTop:'-98px',
    },
    loginBox: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        transform: 'translateY(20px)',
        animation: 'fadeIn 1s ease-out forwards',  // Fade-in animation
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
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
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
        outline: 'none',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',
    },
    inputFocus: {
        borderColor: '#3a7bd5',
        boxShadow: '0 0 5px rgba(58, 123, 213, 0.3)',
    },
    loginBtn: {
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
    loginBtnHover: {
        backgroundColor: '#0288d1',
    },
};

// Keyframe animation for fade-in effect
const fadeInKeyframes = `
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject keyframes into the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(fadeInKeyframes, styleSheet.cssRules.length);

export default Login;
