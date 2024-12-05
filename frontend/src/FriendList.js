import React from 'react';

function FriendList({ friends, onFriendClick }) {
  return (
    <ul>
      {friends.map((friend, index) => (
        <li key={index}>
          <button
            onClick={() => onFriendClick(friend)}
            disabled={friend.isReported}
          >
            {friend.username}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default FriendList;
