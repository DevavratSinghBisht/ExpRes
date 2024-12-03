import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

// Mock data for the profile and posts
const profileData = {
  username: 'johndoe',
  fullName: 'John Doe',
  bio: 'Software Engineer | Tech Enthusiast | Coffee Lover ☕️',
  followers: 1245,
  following: 567,
  posts: 42,
  profilePicture: 'https://via.placeholder.com/150'
};

const initialPosts = [
  {
    id: 1,
    text: 'Just shipped my latest project! 🚀 Hard work pays off. #coding #startup',
    likes: 156,
    comments: 24,
    shares: 5,
    timestamp: '2h ago'
  },
  {
    id: 2,
    text: 'Learning React is an amazing journey. Can\'t wait to build more incredible apps! 💻✨',
    likes: 87,
    comments: 12,
    shares: 3,
    timestamp: '1d ago'
  },
  {
    id: 3,
    text: 'Morning coffee and coding - the perfect combination ☕️👩‍💻',
    likes: 203,
    comments: 36,
    shares: 8,
    timestamp: '3d ago'
  }
];

const ProfilePage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const submittedPost = {
        id: posts.length + 1,
        text: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'Just now'
      };
      setPosts([submittedPost, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: post.comments + 1 } : post
    ));
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
  };

  return (
    <div style={{ backgroundColor: '#071E3D', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1F4287', borderRadius: '15px', padding: '2rem' }}>
        {/* Profile Header */}
        <div style={{ backgroundColor: '#278EA5', padding: '2rem', borderRadius: '15px', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={profileData.profilePicture} 
              alt={`${profileData.username}'s profile`} 
              style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '2rem' }}
            />
            <div>
              <h2 style={{ color: '#21E6C1', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{profileData.fullName}</h2>
              <p style={{ color: '#fff', marginBottom: '0.5rem' }}>@{profileData.username}</p>
              <p style={{ color: '#fff', marginBottom: '1rem' }}>{profileData.bio}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div>
                  <strong style={{ color: '#21E6C1' }}>{profileData.posts}</strong>
                  <p style={{ color: '#fff' }}>Posts</p>
                </div>
                <div>
                  <strong style={{ color: '#21E6C1' }}>{profileData.followers}</strong>
                  <p style={{ color: '#fff' }}>Followers</p>
                </div>
                <div>
                  <strong style={{ color: '#21E6C1' }}>{profileData.following}</strong>
                  <p style={{ color: '#fff' }}>Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post Creation */}
        <div style={{ backgroundColor: '#278EA5', padding: '1rem', borderRadius: '15px', marginBottom: '2rem' }}>
          <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <textarea 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', marginBottom: '1rem', backgroundColor: '#21E6C1', color: '#071E3D' }}
              rows={3}
              maxLength={280}
            />
            <button 
              type="submit" 
              style={{ backgroundColor: '#21E6C1', color: '#071E3D', padding: '0.5rem 1rem', borderRadius: '5px', alignSelf: 'flex-end', cursor: 'pointer' }}
            >
              Post
            </button>
          </form>
        </div>

        {/* Posts List */}
        {posts.map((post) => (
          <div key={post.id} style={{ backgroundColor: '#278EA5', padding: '1rem', borderRadius: '15px', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <img 
                src={profileData.profilePicture} 
                alt={`${profileData.username}'s profile`} 
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1rem' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#21E6C1' }}>{profileData.fullName}</strong>
                  <span style={{ color: '#fff', fontSize: '0.8rem' }}> @{profileData.username} • {post.timestamp}</span>
                </div>
                <p style={{ color: '#fff', marginBottom: '1rem' }}>{post.text}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#21E6C1' }}>
                  <button onClick={() => handleLike(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Heart size={20} style={{ marginRight: '0.5rem' }} />
                    <span>{post.likes}</span>
                  </button>
                  <button onClick={() => handleComment(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <MessageCircle size={20} style={{ marginRight: '0.5rem' }} />
                    <span>{post.comments}</span>
                  </button>
                  <button onClick={() => handleShare(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Share2 size={20} style={{ marginRight: '0.5rem' }} />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;