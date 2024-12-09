import { FaFlag, FaReply } from 'react-icons/fa';
import './ChatBox.css';

const ChatBox = ({ messages, onReportMessage, onForwardMessage, isLoading }) => {
  const validMessages = Array.isArray(messages) ? messages : [];
  const currentUser = localStorage.getItem("parentUsername");  // Get the current user's username

  return (
    <div className="chat-box-messages">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        validMessages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender_username === currentUser ? 'sent' : 'received'}`} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#0056b3'}}>
            <div className="message-content" style={{color: index % 2 === 0 ? 'black' : 'white'}}>
               {msg.message}
            </div>
            <div className="message-actions">
              {/* Report Message Icon */}
              <FaFlag
                className="report-icon"
                title="Report this message"
                onClick={() => onReportMessage(msg.transactionId)} // Report with default reason
                style={{color:'red'}}
              />
              {/* Forward Message Icon */}
              <FaReply
                className="forward-icon"
                title="Forward this message"
                onClick={() => onForwardMessage(msg.transactionId)} // Trigger forward function from parent
                style={{color:'#FFD700', paddingRight:'10px'}}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatBox;
