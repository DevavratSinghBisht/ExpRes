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
  const [forwardedMessage, setForwardedMessage] = useState(null);


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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_username: "currentUsername", // Replace with actual sender's username
          receiver_username: receiver,
        }),
      });
  
      if (!response.ok) {
        console.error("Failed to fetch chat history:", response.statusText);
        return;
      }
  
      const chatHistory = await response.json();
  
      // Since the API returns a list of messages directly, we set the state with that list
      if (Array.isArray(chatHistory)) {
        setMessages(chatHistory); // Set messages directly if the response is an array
      } else {
        console.error("Chat history is not an array:", chatHistory);
      }
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
      const response = await fetch("http://localhost:8000/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      const result = await response.json();
      console.log("Response", result);

      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage(""); // Reset message input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleReportMessage = async (messageId, reason = "Inappropriate content") => {
    const message = messages.find((msg) => msg.transactionId === messageId);
    if (!message) {
      alert("Message not found. Cannot report.");
      return;
    }

    const reportData = {
      reporter_username: "currentUsername",
      reported_username: activeFriend.username,
      message: message.message,
      reason: reason,
      transactionId: message.transactionId || "N/A",
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
      alert("Message reported successfully.");
    } catch (error) {
      console.error("Error reporting message:", error);
      alert("An error occurred while reporting the message.");
    }
  };

  const handleForwardMessage = (messageId) => {
    const messageToForward = messages.find(msg => msg.transactionId === messageId);
  
    if (!messageToForward) {
      alert("Message not found.");
      return;
    }
  
    // Prompt the user to select a recipient (exclude reported users, current user, and active friend)
    const selectedReceiver = prompt(
      "Enter the username of the person you'd like to forward the message to:\n" +
      friends.filter(friend => friend.username !== "currentUsername" && friend.username !== activeFriend.username && !friend.isReported) // Excluding reported users
        .map(friend => friend.username).join("\n")
    );
  
    const receiver = friends.find(friend => friend.username === selectedReceiver);
  
    if (receiver) {
      forwardMessageToReceiver(messageToForward, receiver);
    } else {
      alert("Invalid or non-existent receiver.");
    }
  };

  const forwardMessageToReceiver = (message, receiver) => {
    const forwardedMessage = {
      ...message,
      receiver_username: receiver.username,
      isForwarded: true,
      transactionId: "forwarded-" + Date.now(), // New transaction ID
    };

    // Add the forwarded message to the messages list
    setMessages(prevMessages => [...prevMessages, forwardedMessage]);
    alert(`Message forwarded to ${receiver.username}`);
  };

  return (
    <div className="chat-app" style={{ color: "black", height: "500px" }}>
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
              <ChatBox
                messages={messages}
                onForwardMessage={handleForwardMessage}  // Forward function passed here
                onReportMessage={handleReportMessage}  // Your report handler (if implemented)
                isLoading={isLoading}
              />
            )}
            <div className="input-section">
              <input
                type="text"
                value={m}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={handleSendMessage} disabled={!m.trim()} style={{width:"88px"}}>
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
