import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatWindow = ({ username, friendUsername }) => {
  const [friendDetails, setFriendDetails] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isReported, setIsReported] = useState(false);

  useEffect(() => {
    // Fetch user info and messages
    axios.get(`http://localhost:8000/getUserInfo/${friendUsername}`).then((response) => {
      const { userInfo, messages } = response.data;
    //   setFriendDetails(userInfo);
    //   setMessages(messages);
      setIsReported(userInfo.isReported);
    });
  }, [friendUsername]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderUsername: username,
      receiverUsername: friendUsername,
      content: newMessage,
    };

    axios.post('http://localhost:8000/sendMessage', messageData).then(() => {
      setMessages([...messages, { sender: username, content: newMessage }]);
      setNewMessage('');
    });
  };

  const forwardMessage = (messageId) => {
    const messageToForward = messages.find((msg) => msg.id === messageId);
    if (!messageToForward) return;

    axios.post('http://localhost:8000/sendMessage', {
      senderUsername: username,
      receiverUsername: friendUsername,
      content: messageToForward.content,
      isForwarded: "True",
    }).then(() => {
      console.log('Message forwarded');
    });
  };

  return (
    <div style={{ width: '75%', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
      <h3>
        Chat with {friendDetails.username || '...'}
        {isReported && <span style={{ color: 'red', marginLeft: '1rem' }}>Reported User</span>}
      </h3>
      <div style={{ flex: 1, overflowY: 'auto', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '0.5rem 0' }}>
            {msg.forwardedFrom && (
              <small style={{ color: 'gray' }}>Forwarded from {msg.forwardedFrom}</small>
            )}
            <p>{msg.content}</p>
            <button onClick={() => forwardMessage(msg.id)} style={{ fontSize: '0.8rem' }}>
              Forward
            </button>
          </div>
        ))}
      </div>
      {!isReported && (
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={{ flex: 1, marginRight: '0.5rem', padding: '0.5rem' }}
          />
          <button onClick={sendMessage} style={{ padding: '0.5rem 1rem' }}>
            Send
          </button>
        </div>
      )}
      {isReported && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          This user has been reported. You cannot send messages.
        </div>
      )}
    </div>
  );
};

export default ChatWindow;