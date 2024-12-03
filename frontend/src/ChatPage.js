import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const ChatPage = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const contactName = location.state?.contactName || `Contact ${contactId}`;
  
  const [chats, setChats] = useState([
    { id: 1, sender: 'You', message: 'Hello!', timestamp: '10:00 AM' },
    { id: 2, sender: 'Contact', message: 'Hi there!', timestamp: '10:01 AM' },
    { id: 3, sender: 'You', message: 'How are you?', timestamp: '10:02 AM' },
    { id: 4, sender: 'Contact', message: "I'm doing great, thanks for asking!", timestamp: '10:03 AM' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newChat = {
      id: chats.length + 1,
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChats([...chats, newChat]); 
    setNewMessage('');
  };

  const handleBack = () => {
    navigate('/contacts');
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#F8F4FF', // Light lavender background
      boxShadow: '0 4px 20px rgba(147, 112, 219, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        background: 'linear-gradient(to right, #C71585, #9370DB)', // Deep Pink to Medium Purple
        color: 'white',
      }}>
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            marginRight: '15px',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ←
        </button>
        <h2 style={{ margin: 0, fontWeight: '500', letterSpacing: '0.5px' }}>{contactName}</h2>
      </div>
      
      <div style={{ 
        flexGrow: 1,
        overflowY: 'auto',
        padding: '20px',
        backgroundImage: 'linear-gradient(rgba(199, 21, 133, 0.02), rgba(147, 112, 219, 0.02))'
      }}>
        {chats.map((chat) => (
          <div 
            key={chat.id} 
            style={{
              display: 'flex',
              justifyContent: chat.sender === 'You' ? 'flex-end' : 'flex-start',
              marginBottom: '15px'
            }}
          >
            <div 
              style={{
                maxWidth: '70%',
                padding: '12px 15px',
                borderRadius: '15px',
                backgroundColor: chat.sender === 'You' 
                  ? '#C71585' // Deep Pink for user messages
                  : '#9370DB', // Medium Purple for contact messages
                color: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                position: 'relative'
              }}
            >
              <p style={{ margin: '0 0 5px 0' }}>{chat.message}</p>
              <span style={{ 
                fontSize: '0.7em', 
                opacity: 0.8,
                display: 'block',
                textAlign: 'right'
              }}>{chat.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        display: 'flex', 
        padding: '15px', 
        backgroundColor: 'white',
        borderTop: '1px solid rgba(147, 112, 219, 0.2)'
      }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flexGrow: '1',
            padding: '12px 20px',
            borderRadius: '25px',
            border: '1px solid #9370DB',
            marginRight: '10px',
            outline: 'none',
            transition: 'border-color 0.3s',
            fontSize: '14px'
          }}
          onFocus={(e) => e.target.style.borderColor = '#C71585'}
          onBlur={(e) => e.target.style.borderColor = '#9370DB'}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '12px',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            background: 'linear-gradient(to right, #C71585, #9370DB)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            transition: 'transform 0.2s',
            boxShadow: '0 2px 8px rgba(199, 21, 133, 0.2)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ChatPage;