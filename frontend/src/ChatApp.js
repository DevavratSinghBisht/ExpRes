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
      const response = await fetch("http://localhost:8000/getChatHistory", {
        method: "GET", // Use POST if the backend requires it
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_username: "currentUsername", // Replace with the actual sender's username
          receiver_username: receiver,
        }),
      });
  
      if (!response.ok) {
        console.error("Failed to fetch chat history:", response.statusText);
        return;
      }
  
      const chatHistory = await response.json();
  
      // Update the chat messages state for this conversation
      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
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

  const handleReportMessage = async (message, reason) => {
    // Ensure all required fields are present
    if (!reason) {
      alert("Please provide a reason for reporting the message.");
      return;
    }
  
    if (!message || !message.message || !message.transactionId) {
      alert("Invalid message data. Cannot report.");
      return;
    }
  
    const reportData = {
      reporter_username: "currentUsername", // Replace with actual reporter's username
      reported_username: activeFriend.username,
      message: message.message,
      reason: reason,
      transactionId: message.transactionId || "N/A", // Ensure transactionId is present
    };
  
    try {
      const response = await fetch("http://localhost:8000/reportTheMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error reporting message:", errorDetails);
        alert(`Failed to report message: ${errorDetails.message || response.statusText}`);
        return;
      }
  
      const result = await response.json();
      console.log("Report response:", result);
  
      // Notify the user about the successful report
      alert("Message reported successfully.");
    } catch (error) {
      console.error("Error reporting message:", error);
      alert("An error occurred while reporting the message.");
    }
  };

  return (
    <div className="chat-app" style={{ color: "black", height:"500px" }}>
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

            {/* Add report button for each message */}
            <div className="message-list">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  <p>{msg.message}</p>
                  <button onClick={() => {
                    const reason = prompt("Enter a reason for reporting:");
                    if (reason) {
                      handleReportMessage(msg, reason);
                    }
                  }}>
                    Report
                  </button>
                </div>
              ))}
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
