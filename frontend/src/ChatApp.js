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
  const [chats, setChats] = useState({});



    useEffect(() => {
    // Function to fetch friends data dynamically
    const fetchFriends = async () => {
      try {
        // Get the username from localStorage
        const username = localStorage.getItem("parentUsername");

        if (!username) {
          console.error("Username not found in localStorage.");
          return;
        }

        // Example: Fetching data from an API
        const response = await fetch("http://localhost:8000/getFriendsList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username, // Pass the username in the request
          })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch friends data");
        }

        const data = await response.json(); // Assuming API returns an object with `friend_list`

        // Update the friends state with the data
        setFriends(data.friend_list); // Ensure we handle the case if `friend_list` is not returned
      } catch (error) {
        console.error("Error fetching friends data:", error);
        setFriends([]); // Set empty friends list if fetch fails
      }
    };

    fetchFriends(); // Call the fetch function when the component mounts

  }, []);

  const handleFriendClick = (friend) => {
    if (friend.isBanned) {
      alert("You cannot chat with a reported user.");
      return;
    }
  
    setActiveFriend(friend);
  
    // Fetch messages only if not already loaded
    if (!chats[friend.username]) {
      fetchMessages(friend.username);
    }
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
          sender_username: localStorage.getItem("parentUsername"),
          receiver_username: receiver,
        }),
      });

      if (!response.ok) {
        console.error("Failed to fetch chat history:", response.statusText);
        return;
      }

      const chatHistory = await response.json();

      // Since the API returns a list of messages directly, we set the state with that list
      if (Array.isArray(chatHistory.messages)) {
        setMessages(chatHistory.messages); // Set messages directly if the response is an array
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
    const senderUsername = localStorage.getItem("parentUsername");
    if (!senderUsername) {
      console.error("User is not logged in or username is not set.");
      return;
    }
  
    const userInfoResponse = await fetch(`http://localhost:8000/getUserInfo?username=${senderUsername}&&isReported=false`);
    const userInfo = await userInfoResponse.json();
    console.log("Current user is : ", senderUsername);
    console.log("Response is : ", userInfoResponse);

    if (userInfo.is_banned) {
      alert('You cannot send messages as you are blocked or flagged.');
      return; // Prevent sending the message if the user is blocked/flagged
    }
    if (!m.trim()) return;
  
    const messageData = {
      sender_username: senderUsername,
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
  
      if (response.ok && result.transactionId) {
        messageData.transactionId = result.transactionId;
       setMessages((prevMessages) => [...prevMessages, messageData]);
        setChats((prevChats) => ({
          ...prevChats,
          [activeFriend.username]: [
            ...(prevChats[activeFriend.username] || []),
            messageData,
          ],
        }));
        console.log("The receiver is : ", activeFriend.username);
        console.log("The sender is : ", setChats[activeFriend.username]);
      } else {
        console.error("Error sending message:", result);
      }

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
      reporter_username: localStorage.getItem("parentUsername"),
      reported_username: activeFriend.username,
      message: message.message,
      reason: reason,
      transactionId: message.transactionId,  // Use the correct transactionId
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
      friends.filter(friend => friend.username !== localStorage.getItem("parentUsername") && friend.username !== activeFriend.username && !friend.isReported) // Excluding reported users
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
    // setChats(prevMessages => [...prevMessages, forwardedMessage]);
    setChats((prevChats) => ({
      ...prevChats,
      [activeFriend.username]: [
        ...(prevChats[activeFriend.username] || []),
        forwardedMessage,
      ],
    }));
    alert(`Message forwarded to ${receiver.username}`);
  };

  return (
    <div className="chat-app" style={{
      color: "black", height: "500px", background: 'linear-gradient(to right, #1B1833, #00d2ff)',
      paddingTop: '100px', paddingBottom: '80px', paddingLeft: '100px', paddingRight: '10px'
    }}>
      <div className="sidebar">
        <FriendList friends={friends} onFriendClick={handleFriendClick} />
      </div>
      <div className="chat-box">
        {activeFriend ? (
          <>
            <h2>Chat with {activeFriend.username}</h2>
            {isLoading ? (
              <p style={{ color: 'whitesmoke' }}>Loading messages...</p>
            ) : (
              <ChatBox

                messages={chats[activeFriend.username] || []} // Pass messages specific to the active friend
                onReportMessage={handleReportMessage}
                onForwardMessage={handleForwardMessage}
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
              <button onClick={handleSendMessage} disabled={!m.trim()} style={{ width: "88px" }}>
                Send
              </button>
            </div>
          </>
        ) : (
          <p style={{ color: 'white' }}>Select a friend to chat with.</p>
        )}
      </div>
    </div>
  );
}

export default ChatApp;
