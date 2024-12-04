import React from 'react';

function ChatBox({ messages }) {
  return (
    <div className="chat-box-messages">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender === 'currentUsername' ? 'sent' : 'received'}`}>
          <span>{msg.message}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
