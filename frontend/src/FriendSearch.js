import React, { useState, useMemo, useEffect } from 'react';
import { Search, UserPlus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FriendSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [requestedUsers, setRequestedUsers] = useState(new Set());
  const navigate = useNavigate();
  const parentUsername = localStorage.getItem("parentUsername")

  const getFriendsData = async () => {
    await axios.post('http://localhost:8000/getAllUsers', { username: parentUsername })
      .then((res) => {
        setFriends(res.data.users);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getFriendsData()
  }, [])

  const containerStyle = {
    minHeight: '100vh',
    padding: '24px',
  };

  const cardContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'linear-gradient(to right, #1B1833, #00d2ff)',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '32px'
  };

  const headerStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fafbfc',
    marginBottom: '24px'
  };

  const searchContainerStyle = {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto 32px'
  };

  const searchInputStyle = {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b'
  };

  const gridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const cardStyle = {
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    padding: '20px',
    transition: 'box-shadow 0.3s ease',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const usernameTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: '8px'
  };

  const emailStyle = {
    fontSize: '14px',
    color: '#dde4f0',
    marginBottom: '16px'
  };

  const statsContainerStyle = {
    marginBottom: '12px'
  };

  const statsTitleStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: 'white',
    marginBottom: '4px'
  };

  const followerListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    fontSize: '14px',
    color: '#498af5'
  };

  const buttonStyle = (isRequested) => ({
    width: '100%',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    backgroundColor: isRequested ? '#dcfce7' : '#dbeafe',
    color: isRequested ? '#15803d' : '#1d4ed8',
    marginTop: '16px'
  });

  const filteredFriends = useMemo(() => {
    if (!searchTerm) return friends;
    const searchRegex = new RegExp(searchTerm, 'i');
    return friends.filter(friend => searchRegex.test(friend.username));
  }, [searchTerm, friends]);

  const handleFriendRequest = async (username) => {
    try {
      setRequestedUsers(prev => {
        const newSet = new Set(prev);
        if (newSet.has(username)) {
          newSet.delete(username);
        } else {
          newSet.add(username);
        }
        return newSet;
      });
      // await axios.post('http://localhost:8000/sendFriendRequest', { from, to }); // API to send friend request
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          width: '200px',
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <div style={cardContainerStyle}>
        <h1 style={headerStyle}>Search For Friends</h1>

        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
          <Search style={searchIconStyle} size={20} />
        </div>

        <div style={gridStyle}>
          {filteredFriends.map(friend => (
            <div
              key={friend.username}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h2
                style={usernameTitleStyle}
                onClick={() => {
                  if (friend.is_banned) {
                    setModalMessage("This user is banned");
                    setIsModalOpen(true);
                    return;
                  }
                  navigate('/ProfilePage', { state: { username: friend.username } });
                }}>
                {friend.username}
              </h2>
              <p style={emailStyle}>{friend.email}</p>

              <div style={statsContainerStyle}>
                <p style={statsTitleStyle}>Followers: {friend.followers?.length}</p>
                <div style={followerListStyle}>
                  {friend.followers?.slice(0, 3).map((follower, index) => (
                    <span key={index}>
                      {follower}{index !== Math.min(2, friend.followers?.length - 1) ? ',' : ''}
                    </span>
                  ))}
                  {friend.followers?.length > 3 && <span>...</span>}
                </div>
              </div>

              <div style={statsContainerStyle}>
                <p style={statsTitleStyle}>Following: {friend.following?.length}</p>
                <div style={followerListStyle}>
                  {friend.following?.slice(0, 3).map((following, index) => (
                    <span key={index}>
                      {following}{index !== Math.min(2, friend.following?.length - 1) ? ',' : ''}
                    </span>
                  ))}
                  {friend.following?.length > 3 && <span>...</span>}
                </div>
              </div>

              <button
                onClick={() => handleFriendRequest(friend.username)}
                style={buttonStyle(requestedUsers.has(friend.username))}
              >
                {requestedUsers.has(friend.username) ? (
                  <>
                    <Check size={16} />
                    Requested
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    Add Friend
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {filteredFriends.length === 0 && (
          <p style={{ textAlign: 'center', color: '#64748b', marginTop: '24px' }}>
            No friends found matching your search term
          </p>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default FriendSearch;