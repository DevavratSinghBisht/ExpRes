import React from 'react';
import './FriendList.css';

function FriendList({ friends, onFriendClick }) {
  return (
    <ul>
      {friends.map((friend, index) => (
        <li key={index}>
          <button
            onClick={() => onFriendClick(friend)}
            disabled={friend.isReported}
          >
            {friend.username} {friend.isReported && <span style={{color: 'red', fontWeight: 'bold'}}>🚩</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default FriendList;
