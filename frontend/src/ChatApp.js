import React, { useState, useEffect } from 'react';
import FriendList from './FriendList';
import ChatBox from './ChatBox';
import useWebSocket from './WebSocket';
import './App.css';
import './ChatApp.css';

function ChatApp() {
  const [friends, setFriends] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [m, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage, ws } = useWebSocket();

  // Fetch friend list from API
  useEffect(() => {
    const mockFriends = [
      { username: "Alice", email: "alice@example.com", is_active: true, isReported: false },
      { username: "Bob", email: "bob@example.com", is_active: true, isReported: true },
      { username: "Charlie", email: "charlie@example.com", is_active: true, isReported: false },
    ];
    setFriends(mockFriends);
  }, []);

  const handleFriendClick = (friend) => {
    if (friend.isReported) {
      alert("You cannot chat with a reported user.");
      return;
    }

    setActiveFriend(friend);
    fetchMessages(friend.username);
  };

  const fetchMessages = async (receiver) => {
    setIsLoading(true);
    try {
      const mockMessages = [
        { sender_username: "Alice", message: "Hi there!", isForwarded: false },
        { sender_username: "currentUsername", message: "Hello!", isForwarded: false },
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!m.trim()) return;

    const messageData = {
      sender_username: "currentUsername",
      receiver_username: activeFriend.username,
      message: m,
      isForwarded: false,
      transactionId: "Missing",
    };

    try {
      // Send message to backend
      const response = await fetch("http://localhost:8000/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      // if (!response.ok) {
      //   console.error("HTTP error", response.status);
      //   return;
      // }

      const result = await response.json();
      console.log("Response", result);

      // Send message via WebSocket
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(messageData));
      }

      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-app" style={{ color: "black" }}>
      <div className="sidebar">
        <FriendList friends={friends} onFriendClick={handleFriendClick} />
      </div>
      <div className="chat-box">
        {activeFriend ? (
          <>
            <h2>Chat with {activeFriend.username}</h2>
            {isLoading ? (
              <p>Loading messages...</p>
            ) : (
              <ChatBox messages={messages} />
            )}
            <div className="input-section">
              <input
                type="text"
                value={m}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={handleSendMessage} disabled={!m.trim()}>
                Send
              </button>
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
