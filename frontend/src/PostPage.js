import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Heart, Flag } from 'lucide-react';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('parentUsername');
    axios
      .post('http://localhost:8000/getUserInfo', { username: username, isReported: false })
      .then((response) => setCurrentUser(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  useEffect(() => {
    if (currentUser) {
      axios
        .post('http://localhost:8000/getAllPosts')
        .then((response) => {
          setPosts(response.data.posts);
          console.log("The posts : ", response.data.posts);
        })
        .catch((error) => console.error('Error fetching posts:', error));
    }
  }, [currentUser]);

  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      alert('Please enter some content for the post.');
      return;
    }
    const postData = {
      username: currentUser ? localStorage.getItem("parentUsername")
        : 'Anonymous',
      content: newPost,
      id: Date.now().toString(),
    };
    axios
      .post('http://localhost:8000/createPost', postData)
      .then((response) => {
        setPosts([response.data, ...posts]);
        setNewPost('');
      })
      .catch((error) => console.error('Error posting!', error));
  };

  const parentUsername = localStorage.getItem("parentUsername");

  const handleReport = async (postContent, postId) => {
    await axios.post('http://localhost:8000/reportPost', {
      "content": postContent,
      "id": postId,
      "username": parentUsername
    })
      .then((res) => {
        setPosts(prevPosts => prevPosts.map(post => post.id === postId ? { ...post, is_reported: true } : post));
        localStorage.setItem(`post_${postId}_reported`, 'true');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const humanizeTimeDifference = (givenDate) => {
    const today = new Date();
    const utcDate = new Date(givenDate);
    const pstDate = new Date(utcDate.getTime() - (8 * 60 * 60 * 1000));
    const timeDiff = today - new Date(pstDate);
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return seconds === 1 ? "Just now" : `${seconds} seconds ago`;
    if (minutes < 60) return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    if (days < 30) return days === 1 ? "1 day ago" : `${days} days ago`;
    if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }

  return (
    <div style={containerStyle}>
      <div style={cardContainerStyle}>
        <div className="content-section" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <div className="create-post-container">
            <h3 style={{ marginTop: '0px', color: 'white' }}><b>Share your thoughts!</b></h3>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              maxLength="500"
              className="post-textarea"
              style={{ width: '100%', height: '100px', marginBottom: '10px' }}
            />
            <button onClick={handlePostSubmit} className="post-button" style={{ color: "white" }}>Post</button>
          </div>
          <div className="posts-container" style={{ marginTop: '20px' }}>
            {posts.length === 0 ? (
              <p>No posts yet. Be the first to share!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {posts.map((post) => (
                  <div key={post.id} style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(45deg, #3b82f6, #2563eb)', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: '600', color: '#3b82f6' }}>@{post.username}</span>
                          <span style={{ color: '#64748b', marginLeft: '0.5rem' }}>{humanizeTimeDifference(new Date(post.created_at))}</span>
                        </div>
                        <p style={{ color: '#ffffff', marginBottom: '1rem', lineHeight: 1.5 }}>{post.content}</p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button
                            onClick={() => handleLike(post.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', padding: '0.5rem', borderRadius: '8px', transition: 'background-color 0.2s' }}
                          >
                            <Heart size={20} />
                            <span>{post.likes}</span>
                          </button>
                          <button
                            onClick={() => handleReport(post.content, post.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: (post.is_reported ? '#718096' : '#ef4444'), padding: '0.5rem', borderRadius: '8px', transition: 'background-color 0.2s' }}
                            disabled={post.is_reported}
                          >
                            <Flag size={20} />
                            <span>{post.is_reported ? 'Reported' : 'Report'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: '100vh',
  padding: '24px',
  boxSizing: 'border-box'
};

const cardContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  background: 'linear-gradient(to right, #1B1833, #00d2ff)',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '32px',
  maxHeight: 'calc(100vh - 48px)',
  overflowY: 'auto'
};

export default PostPage;