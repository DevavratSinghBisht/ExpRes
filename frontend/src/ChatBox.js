import { FaFlag, FaReply } from 'react-icons/fa';
import './ChatBox.css';

const ChatBox = ({ messages, onReportMessage, isLoading }) => {
  return (
    <div className="chat-box-messages">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <div className="message-content">
              <strong>{msg.sender_username}:</strong> {msg.message}
            </div>
            <div className="message-actions">
              <FaFlag
                className="report-icon"
                title="Report this message"
                onClick={() => onReportMessage(msg.id)} // Report functionality
              />
              <FaReply
                className="forward-icon"
                title="Forward this message"
                onClick={() => console.log(`Forwarding message: ${msg.message}`)} // Implement forward functionality
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatBox;
