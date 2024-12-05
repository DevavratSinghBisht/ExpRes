import React, { useState, useEffect } from 'react';
import FriendList from './FriendList';
import ChatBox from './ChatBox';
import useWebSocket from './WebSocket';
import './App.css';

function ChatApp() {
  const [friends, setFriends] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { sendMessage, ws } = useWebSocket();

  // Fetch friend list from API
  // useEffect(() => {
  //   const fetchFriends = async () => {
  //     const response = await fetch("http://localhost:8000/getFriendsList", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username: "currentUsername" }),
  //     });
  //     const data = await response.json();
  //     setFriends(data.friend_list);
  //   };
  //   fetchFriends();
  // }, []);
  useEffect(() => {
    // Mock data
    const mockFriends = [
      { username: "Alice", email: "alice@example.com", is_active: true, isReported: false },
      { username: "Bob", email: "bob@example.com", is_active: true, isReported: true },
      { username: "Charlie", email: "charlie@example.com", is_active: true, isReported: false },
    ];
    setFriends(mockFriends);
  }, []);

  const handleFriendClick = (friend) => {
    setActiveFriend(friend);
    // Fetch last 10 messages between the user and the selected friend
    fetchMessages(friend.username);
  };

  // const fetchMessages = async (receiver) => {
  //   const response = await fetch("http://localhost:8000/chatApi", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       sender_username: "currentUsername",
  //       receiver_username: receiver,
  //     }),
  //   });
  //   const data = await response.json();
  //   setMessages(data.messages);
  // };
  const fetchMessages = (receiver) => {
    const mockMessages = [
      { sender_username: "Alice", message: "Hi there!", isForwarded: false },
      { sender_username: "currentUsername", message: "Hello!", isForwarded: false },
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = async () => {
    if (!message) return;

    const messageData = {
      sender_username: "currentUsername",
      receiver_username: activeFriend.username,
      message: message,
      isForwarded: false,
      transaction_id: null,
    };

    try {
      const response = await fetch("http://localhost:8000/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });
      const result = await response.json();
      console.log(result.message_status);

      // Send message via WebSocket
      if (ws && activeFriend) {
        ws.send(JSON.stringify(messageData));
      }

      setMessages([...messages, messageData]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onFriendClick={handleFriendClick}
        />
      </div>
      <div className="chat-box">
        {activeFriend ? (
          <>
            <h2>Chat with {activeFriend.username}</h2>
            <ChatBox messages={messages} />
            <div className="input-section">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a friend to chat with.</p>
        )}
      </div>
    </div>
  );
}

export default ChatApp;
