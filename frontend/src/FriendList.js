import React from 'react';

function FriendList({ friends, onFriendClick }) {
  return (
    <div className="friend-list">
      <h3>Your Friends</h3>
      {friends.map((friend) => (
        <div
          key={friend.username}
          className={`friend-item ${friend.isReported ? 'reported' : ''}`}
          onClick={() => onFriendClick(friend)}
        >
          <img src={friend.profile_picture} alt={friend.username} />
          <span>{friend.username}</span>
          {friend.isReported && <span className="reported-tag">Reported</span>}
        </div>
      ))}
    </div>
  );
}

export default FriendList;