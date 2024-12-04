import React, { useState } from 'react';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        // Add authentication logic here





        // Replace this URL with your backend's login endpoint
        const apiUrl = "https://example.com/api/login";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            // Example: Save token to localStorage or state
            localStorage.setItem("authToken", data.token);
            alert("Login successful!");

            // Redirect user after successful login (optional)
            // navigate("/dashboard"); // Requires React Router
        } catch (error) {
            console.error("Error during login:", error.message);
            alert("Error: " + error.message);
        }
    };



    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
