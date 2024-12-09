import React, { useState, useEffect } from 'react';
import Login from './login';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './navbar';
import './App.css';
import './about.css';
import About from './about';
import sample from './universe.mp4';
import PostPage from './PostPage';
import { Link } from 'react-router-dom';
import ChatApp from './ChatApp';
import RegistrationForm from './RegistrationForm';
import ProfilePage from './ProfilePage';
import FriendSearch from './FriendSearch';
// import { Link } from 'react-router-dom';


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
          <p style={{color:"white"}}>Express your thoughts with privacy and security!</p>
          <p style={{fontSize:'15.5px', color:"white"}}>Head over to the Post section to post content</p>
          {/* <Link to="/posts" className="scroll-icon">
            &#8595; 
          </Link> */}
          <a href="#about-page" className="scroll-icon">&#8595;</a>
        </div>
      </div>


      <div className="about-page" id="about-page">
        <h1>About Us</h1>
        <p>
          Welcome to our website! We are a team dedicated to providing the best experience for our users. Our goal is to create a social media application using cutting-edge technologies and providing enhanced security and privacy to the users.
        </p>
        <h2 style={{ paddingLeft: "310px" }}>Our Mission</h2>
        <p>
          Focus on the core value of privacy and how your social media platform is committed to ensuring data protection.
        </p>

        <h2 style={{ paddingLeft: "310px" }}>Our Team</h2>
        <p>
          Our team is composed of passionate professionals with expertise in various fields, including software development, design, and user experience. We work together to build something great!
          <ul>
            <li>Vrushali Harane</li>
            <li>Kunjal Agrawal</li>
            <li>Purva Khadke</li>
            <li>Devavrat Singh Bisht</li>
            <li>Priyadarshini Ganeshkumar</li>
          </ul>
        </p>
        {/* <h2 style={{ paddingLeft: "310px" }}>Contact</h2> */}
        <p>
          If you have any questions or would like to get in touch, please don't hesitate to reach out to us at devavratsinghbisht@gmail.com.
        </p>
        <br></br><br></br><br></br>
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
        <p style={{ marginLeft: '40px' }}>&copy; 2024 ExpRes. All rights reserved.</p><br></br>
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
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/ChatApp" element={<ChatApp/>} />
        <Route path="/friendSearch" element={<FriendSearch />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
