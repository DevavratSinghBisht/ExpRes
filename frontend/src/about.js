// src/About.js

import React from 'react';
import './about.css'; // For any specific styling

const About = () => {
    return (
        <div className="about-page">
            <h1>About Us</h1>
            <p>
                Welcome to our website! We are a team dedicated to providing the best experience for our users. Our goal is to create a social media application using cutting-edge technologies and providing enhanced security and privacy to the users.
            </p>
            <h2 style={{ paddingLeft: "290px" }}>Our Mission</h2>
            <p>
                Focus on the core value of privacy and how your social media platform is committed to ensuring data protection.
            </p>

            <h2 style={{ paddingLeft: "290px" }}>Our Team</h2>
            <p>
                Our team is composed of passionate professionals with expertise in various fields, including software development, design, and user experience. We work together to build something great!
                <ul>
                    <li>Devavrat Singh Bisht</li>
                    <li>Kunjal Agrawal</li>
                    <li>Priyadarshini Ganeshkumar</li>
                    <li>Purva Khadke</li>
                    <li>Vrushali Harane</li>
                </ul>
            </p>
            <h2 style={{ paddingLeft: "290px" }}>Contact</h2>
            <p>
                If you have any questions or would like to get in touch, please don't hesitate to reach out to us at devavratsinghbisht@gmail.com.
            </p>
        </div>
    );
}

export default About;
