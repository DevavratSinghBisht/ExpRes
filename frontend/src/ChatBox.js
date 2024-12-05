import { FaFlag, FaReply } from 'react-icons/fa';
import './ChatBox.css';

const ChatBox = ({ messages, onReportMessage, onForwardMessage, isLoading }) => {
  const validMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="chat-box-messages">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        validMessages.map((msg, index) => (
          <div key={index} className="chat-message">
            <div className="message-content">
              <strong>{msg.sender_username}:</strong> {msg.message}
            </div>
            <div className="message-actions">
              {/* Report Message Icon */}
              <FaFlag
                className="report-icon"
                title="Report this message"
                onClick={() => onReportMessage(msg.transactionId)} // Report with default reason
              />
              {/* Forward Message Icon */}
              <FaReply
                className="forward-icon"
                title="Forward this message"
                onClick={() => onForwardMessage(msg.transactionId)} // Trigger forward function from parent
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatBox;
