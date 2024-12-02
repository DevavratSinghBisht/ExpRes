import React, { useState, useEffect } from 'react';
import Login from './login';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './navbar';
import './App.css';
import About from './about';
import sample from './universe.mp4';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user data
  useEffect(() => {
    axios
      .get('http://localhost:8000/user')
      .then((response) => setCurrentUser(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  // Fetch all posts
  useEffect(() => {
    axios
      .get('http://localhost:8000/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Create a new post
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

  // Toggle like
  const handleToggleLike = (id) => {
    if (!currentUser) {
      alert('User not logged in.');
      return;
    }

    axios
      .put(`http://localhost:8000/posts/like/${id}`, { userId: currentUser.id })
      .then((response) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id ? { ...post, likes: response.data.likes } : post
          )
        );
      })
      .catch((error) => console.error('Error liking the post!', error));
  };

  // Add a comment
  const handleAddComment = (id) => {
    if (!newComment.trim()) {
      alert('Please enter a comment.');
      return;
    }

    axios
      .put(`http://localhost:8000/posts/comment/${id}`, {
        userId: currentUser ? currentUser.id : null,
        commentText: newComment,
      })
      .then((response) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id ? { ...post, comments: response.data.comments } : post
          )
        );
        setNewComment('');
      })
      .catch((error) => console.error('Error commenting on the post!', error));
  };

  return (
    <div className="main-page">
      <div className="video-container">
        <video autoPlay loop muted>
          <source src={sample} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="content">
        <div className="create-post-container">
          <h3 style={{marginTop:'0px', marginLeft:'228px', color:'#001F3F'}}><b>Share your thoughts!</b></h3>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            maxLength="500"
            className="post-textarea"
          />
          <button onClick={handlePostSubmit} className="post-button">
            Post
          </button>
        </div>

        <div className="posts-container">
          {posts.length === 0 ? (
            <p>No posts yet. Be the first to share!</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-header">
                  {post.profilePicture && <img src={post.profilePicture} alt="profile" />}
                  <h2>{post.username || 'Anonymous'}</h2>
                </div>
                <p>{post.content}</p>
                <button onClick={() => handleToggleLike(post._id)}>
                  {post.likes || 0} Likes
                </button>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  style={{ color: 'white' }}
                />
                <button onClick={() => handleAddComment(post._id)}>Comment</button>
              </div>
            ))
          )}
        </div>
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
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
