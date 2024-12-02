import React, { useState, useEffect } from 'react';
import Login from './login';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './navbar';
import './App.css';
import About from './about';
import sample from './universe.mp4';
import PostPage from './PostPage';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/user')
      .then((response) => setCurrentUser(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8000/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      alert('Please enter some content for the post.');
      return;
    }

    const postData = {
      content: newPost,
      userId: currentUser ? currentUser.id : null,
      username: currentUser ? currentUser.username : 'Anonymous',
      profilePicture: currentUser ? currentUser.profilePicture : null,
    };

    axios
      .post('http://localhost:8000/posts', postData)
      .then((response) => {
        setPosts([response.data, ...posts]);
        setNewPost('');
      })
      .catch((error) => console.error('Error posting!', error));
  };

  return (
    <div className="homepage-container">
      <div className="video-overlay">
        <video autoPlay loop muted>
          <source src={sample} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-content">
          <h1 className="typing-container">Welcome to ExpRes
            <span className="blinking-cursor"></span>
          </h1>
          <p>Express your thoughts with privacy and security!</p>
          <Link to="/posts" className="scroll-icon">
            &#8595; {/* Downward arrow symbol */}
          </Link>
        </div>
      </div>



      <div className="footer">
        <p style={{ marginLeft: '40px' }}>Contact us for more information!</p>
        <p style={{ marginLeft: '40px' }}>Email: <a href="mailto:devavratsinghbisht@gmail.com">devavratsinghbisht@gmail.com</a></p>
        {/* <p>Follow us on social media:</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1024px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Twitter_Logo_2021.svg" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram" />
          </a>
        </div> */}
        <p style={{ marginLeft: '40px' }}>&copy; 2024 ExpRes. All rights reserved.</p>
      </div>
    </div>


  );
};


const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
