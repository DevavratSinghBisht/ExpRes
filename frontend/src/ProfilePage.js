import React, { useEffect, useState } from 'react';
import { Heart, X, Flag, Send, Check, XIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const autoProfileData = {
  "username": "johndoe92",
  "email": "johndoe92@example.com",
  "profile_picture": "https://example.com/profile_pics/johndoe92.jpg",
  "is_active": true,
  "created_at": "2024-12-03T18:12:09.408Z",
  "last_login_at": "2024-12-03T18:12:09.408Z",
  "visibility": false,
  "isRequested": false,
  "followers": [
    "janedoe88",
    "mike_smith22",
    "mike_smith22",
    "mike_smith22",
    "mike_smith22",
    "mike_smith22",
    "mike_smith22",
    "mike_smith22",
    "mike_smith22",
    "mike_smith22",
    "mike_smith22",
  ],
  "following": [
    "alice_jones",
    "bob_brown",
    "bob_brown",
    "bob_brown",
    "bob_brown",
    "bob_brown",
  ],
  "pendingRequests": [
    "charlie_davis",
    "emma_wilson",
    "george_miller"
  ]
};

const autoPosts = [
  {
    id: "1",
    content: "Exploring the beauty of nature today! 🌲🌅 The forest is a place of peace and rejuvenation. #NatureLover #FreshAir",
    likes: 45,
    created_at: "2024-12-04T03:10:43.489Z"
  },
  {
    id: "2",
    content: "Just finished a long hike up the mountain, and the view is absolutely breathtaking. 🌄 Feeling on top of the world! 🏞️ #MountainViews #Adventure",
    likes: 67,
    created_at: "2024-12-03T03:12:50.123Z"
  },
  {
    id: "3",
    content: "Started reading a new book on mindfulness. 📖 The journey to inner peace begins with a single page. ✨ #Mindfulness #Books #SelfCare",
    likes: 32,
    created_at: "2024-12-02T03:15:00.456Z"
  },
  {
    id: "4",
    content: "Trying out a new recipe today! 🥘 Who knew cooking could be so therapeutic? 🍴🍅 Can’t wait to dig in! #Foodie #HomeCooking #HealthyEats",
    likes: 58,
    created_at: "2022-12-04T03:18:30.789Z"
  },
  {
    id: "5",
    content: "Feeling grateful for all the amazing people in my life. 💕 It’s the little moments and big hearts that make life so special. #Gratitude #Love #CherishEveryMoment",
    likes: 85,
    created_at: "2021-12-04T03:20:10.012Z"
  }
];

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const humanizeTimeDifference = (givenDate) => {
  const today = new Date();
  const timeDiff = today - new Date(givenDate); // Difference in milliseconds

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximate
  const years = Math.floor(days / 365); // Approximate

  if (seconds < 60) {
    return seconds === 1 ? "Just now" : `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (days < 30) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (months < 12) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
}

// const UserList = ({ users }) => (
//   <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//     {users.map((user, index) => (
//       <div key={index} style={{
//         display: 'flex',
//         alignItems: 'center',
//         padding: '12px',
//         borderRadius: '12px',
//         backgroundColor: 'rgba(255, 255, 255, 0.05)',
//         transition: 'background-color 0.2s'
//       }}>
//         <div style={{
//           width: '40px',
//           height: '40px',
//           borderRadius: '50%',
//           background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
//           marginRight: '1rem'
//         }} />
//         <span style={{ color: '#ffffff', fontWeight: '500' }}>{user}</span>
//       </div>
//     ))}
//   </div>
// );

const ProfilePage = () => {
  const [posts, setPosts] = useState(autoPosts);
  const [profileData, setProfileData] = useState(autoProfileData);
  const [newPost, setNewPost] = useState('');
  const [showModal, setShowModal] = useState({ type: null, data: null });
  const location = useLocation();
  const username = location.state?.username;

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:8000/createPost', {
      username: username,
      content: newPost
    })
      .then((res) => {
        if (res.data) {
          setPosts([res.data, ...posts]);
          setNewPost('');
        }
        // setProfileData(res.data) //TODO: Uncomment this code
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const [reportedPosts, setReportedPosts] = useState([]);

  const handleReport = async (postContent, postId) => {
    const parentUsername = localStorage.getItem("parentUsername")
    await axios.post('http://localhost:8000/reportTheMessage', {
      reporter_username: parentUsername,
      message: postContent,
      reason: null,
      reporter_key: null
    })
      .then((res) => {
        // setReportedPosts(prev => [...prev, postId]); //TODO: Uncomment this code
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleMessageUser = (username) => {
    console.log(`Messaging user: ${username}`);
    alert(`Opening chat with ${username}`);
  };

  const handleAcceptRequest = (requestingUser) => {
    //TODO: Remove 236 to 246
    const updatedPendingRequests = profileData.pendingRequests.filter(user => user !== requestingUser);
    const updatedFollowers = [...profileData.followers, requestingUser];
    const updatedFollowing = [...profileData.following, requestingUser];

    // Update profile data
    setProfileData(prevData => ({
      ...prevData,
      followers: updatedFollowers,
      following: updatedFollowing,
      pendingRequests: updatedPendingRequests
    }));

    const parentUsername = localStorage.getItem("parentUsername")
    // TODO: Uncomment and implement actual API call
    // await axios.post('http://localhost:8000/responseToFriendRequest', { 
    //   sender_username: parentUsername,
    //   response_to_request: true
    // })
    // .then((res) => {
    //   // getUserData(); //TODO: Uncomment this
    //   // Handle successful request acceptance
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  };

  const handleRejectRequest = (requestingUser) => {
    //TODO: Remove 265 to 269
    const updatedPendingRequests = profileData.pendingRequests.filter(user => user !== requestingUser);
    setProfileData(prevData => ({
      ...prevData,
      pendingRequests: updatedPendingRequests
    }));

    const parentUsername = localStorage.getItem("parentUsername")
    // TODO: Uncomment and implement actual API call
    // await axios.post('http://localhost:8000/responseToFriendRequest', { 
    //   sender_username: parentUsername,
    //   response_to_request: false
    // })
    // .then((res) => {
    //   // getUserData() //TODO: Uncomment this
    //   // Handle successful request rejection
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '16px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>{title}</h3>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={24} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const UserList = ({ users, onMessageUser, onAcceptUser, onRejectUser, isPendingRequest = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {users.map((user, index) => (
        <div key={index}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transition: 'background-color 0.2s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                marginRight: '1rem'
              }} />
              <span style={{ color: '#ffffff', fontWeight: '500' }}>{user}</span>
            </div>
            {onMessageUser && (
              <button
                onClick={() => onMessageUser(user)}
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                <Send size={16} />
                Message
              </button>
            )}
            {isPendingRequest ? (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => onAcceptUser(user)}
                  style={{
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => onRejectUser(user)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <XIcon size={16} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );

  const getUserData = async () => {
    await axios.post('http://localhost:8000/getUserInfo', {
      username: username,
      isReported: false
    })
      .then((res) => {
        // setProfileData(res.data) //TODO: Uncomment this code
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getUserPosts = async () => {
    await axios.post('http://localhost:8000/getUserInfo', {
      username: username,
      isReported: false
    })
      .then((res) => {
        // setPosts(res.data.posts) //TODO: Uncomment this code
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUserData()
    getUserPosts()
  }, [])

  return (
    <div style={{
      backgroundColor: '#0f172a',
      minHeight: '100vh',
      padding: '2rem',
      color: '#ffffff'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Profile Header */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.5)'
            }} />
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#ffffff'
              }}>@{profileData.username}</h2>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <></>
                <div style={{ display: 'flex', gap: '2rem', flex: 1 }}>
                  <div
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '1', fontWeight: '700', color: '#3b82f6' }}>
                      {posts.length}
                    </div>
                    <div style={{ color: '#94a3b8' }}>Posts</div>
                  </div>
                  <div
                    onClick={() => setShowModal({ type: 'followers', data: profileData.followers })}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '1', fontWeight: '700', color: '#3b82f6' }}>
                      {profileData.followers.length}
                    </div>
                    <div style={{ color: '#94a3b8' }}>Followers</div>
                  </div>
                  <div
                    onClick={() => setShowModal({ type: 'following', data: profileData.following })}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '1', fontWeight: '700', color: '#3b82f6' }}>
                      {profileData.following.length}
                    </div>
                    <div style={{ color: '#94a3b8' }}>Following</div>
                  </div>
                </div>
                <div
                  onClick={() => setShowModal({ type: 'pendingRequests', data: profileData.pendingRequests })}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '-8px',
                    backgroundColor: profileData.pendingRequests.length > 0 ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    padding: '0.5rem',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    fontSize: '1',
                    fontWeight: '700',
                    color: profileData.pendingRequests.length > 0 ? '#3b82f6' : '#94a3b8'
                  }}>
                    {profileData.pendingRequests.length}
                  </div>
                  <div style={{ color: '#94a3b8' }}>Pending Requests</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post Creation */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handlePostSubmit}>
            <input
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              style={{
                width: '96%',
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: '1px solid rgba(10, 10, 10, 0.75)',
                marginBottom: '1rem',
                resize: 'vertical',
                minHeight: '100px',
                fontFamily: 'inherit'
              }}
              maxLength={280}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
              >
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {posts.map((post) => (
            <div key={post.id} style={{
              backgroundColor: '#1e293b',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                  flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#3b82f6' }}>
                      @{profileData.username}
                    </span>
                    <span style={{ color: '#64748b', marginLeft: '0.5rem' }}>
                      {humanizeTimeDifference(new Date(post.created_at))}
                    </span>
                  </div>
                  <p style={{ color: '#ffffff', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {post.content}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => { handleLike(post.id) }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#3b82f6',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <Heart size={20} />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => {
                        handleReport(post.content, post.id)
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: reportedPosts.includes(post.id) ? '#718096' : '#ef4444',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        transition: 'background-color 0.2s'
                      }}
                      disabled={reportedPosts.includes(post.id)}
                    >
                      <Flag size={20} />
                      <span>{reportedPosts.includes(post.id) ? 'Reported' : 'Report'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        <Modal
          isOpen={showModal.type === 'followers'}
          onClose={() => setShowModal({ type: null, data: null })}
          title="Followers"
        >
          <UserList users={profileData.followers}
            onMessageUser={handleMessageUser}
          />
        </Modal>

        <Modal
          isOpen={showModal.type === 'following'}
          onClose={() => setShowModal({ type: null, data: null })}
          title="Following"
        >
          <UserList users={profileData.following}
            onMessageUser={handleMessageUser}
          />
        </Modal>
        <Modal
          isOpen={showModal.type === 'pendingRequests'}
          onClose={() => setShowModal({ type: null, data: null })}
          title="Pending Requests"
        >
          <UserList
            users={profileData.pendingRequests}
            // onMessageUser={() => {}} 
            onAcceptUser={handleAcceptRequest}
            onRejectUser={handleRejectRequest}
            isPendingRequest={true}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;