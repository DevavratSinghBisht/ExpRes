import React, { useState, useEffect } from 'react';
import Login from './login';
import axios from 'axios';
// import HomePage from './home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './navbar';
import './App.css';
import About from './about';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newMedia, setNewMedia] = useState(null); // Optional media (image/video)
  const [currentUser, setCurrentUser] = useState(null); // Stores the logged-in user's data

  // Fetch current user data on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8000/user') // Replace with your API endpoint for fetching current user data
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  // Fetch all posts from the backend on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8000/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Handle creating a new post
  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      alert('Please enter some content for the post.');
      return;
    }

    const postData = {
      content: newPost,
      media: newMedia,
      userId: currentUser ? currentUser.id : null,
      username: currentUser ? currentUser.username : 'Anonymous',
      profilePicture: currentUser ? currentUser.profilePicture : null,
    };

    axios
      .post('http://localhost:8000/posts', postData)
      .then((response) => {
        setPosts([response.data, ...posts]);
        setNewPost('');
        setNewMedia(null);
      })
      .catch((error) => console.error('Error posting!', error));
  };

  // Handle toggling like on a post
  const handleToggleLike = (id) => {
    if (!currentUser) {
      alert('User not logged in.');
      return;
    }

    const likeData = { userId: currentUser.id };

    axios
      .put(`http://localhost:8000/posts/like/${id}`, likeData)
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post._id === id
            ? { ...post, likes: response.data.likes, isLikedByUser: response.data.isLikedByUser }
            : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error('Error liking the post!', error));
  };

  // Handle adding a comment to a post
  const handleAddComment = (id) => {
    if (!newComment.trim()) {
      alert('Please enter a comment.');
      return;
    }

    const commentData = {
      userId: currentUser ? currentUser.id : null,
      commentText: newComment,
    };

    axios
      .put(`http://localhost:8000/posts/comment/${id}`, commentData)
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post._id === id ? { ...post, comments: response.data.comments } : post
        );
        setPosts(updatedPosts);
        setNewComment('');
      })
      .catch((error) => console.error('Error commenting on the post!', error));
  };

  return (
    <div className="HomePage" style={{ backgroundImage: `url('/background.jpg')` }}>
      {/* <header className="HomePage-header">
        <h1>Social Media App</h1>
      </header> */}

      {/* Create Post Section */}
      <div className="create-post-container" style={{ marginTop: '50px' }}>
        <input
          type='text'
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          className="post-textarea"
          maxLength={'500'}
          style={{ width: "550px", height: "50px" }}
        />
        <button onClick={handlePostSubmit} className="submit-post-button">
          Post
        </button>
      </div>

      {/* Display Posts */}
      <div className="posts-container">
        {posts.length === 0 ? (
          <p className="no-posts-message" style={{ marginLeft: "100px" }}>No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                {post.profilePicture && (
                  <img src={post.profilePicture} alt="profile" className="profile-img" />
                )}
                <h2 className="username">{post.username || 'Anonymous'}</h2>
              </div>
              <p className="post-content">{post.content}</p>

              <div className="post-actions">
                <button onClick={() => handleToggleLike(post._id)} className="like-button">
                  {post.isLikedByUser ? 'Unlike' : 'Like'} ({post.likes || 0})
                </button>
              </div>

              {/* Comment Section */}
              <div className="comment-section">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-textarea"
                />
                <button onClick={() => handleAddComment(post._id)} className="comment-button">
                  Comment
                </button>
              </div>

              {/* Display Comments */}
              <div className="comments-list">
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p>
                      <strong>{comment.userId || 'Anonymous'}:</strong> {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="bg-gray-100 min-h-screen" style={{ marginTop: "1000px" }}>
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>© 2024 ExpRes. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    // <div className="App">
    //   <HomePage />
    //   <Login />
    // </div>
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Default route */}
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Footer/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
