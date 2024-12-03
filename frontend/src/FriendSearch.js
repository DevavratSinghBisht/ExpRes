import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import './FriendSearch.css';

// Sample friend data (in a real app, this would come from an API or database)
// const initialFriends = [
//   { id: 1, username: 'johndoe123', name: 'John Doe', interests: ['coding', 'hiking'] },
//   { id: 2, username: 'janesmit', name: 'Jane Smith', interests: ['reading', 'photography'] },
//   { id: 3, username: 'alexjohnson', name: 'Alex Johnson', interests: ['gaming', 'music'] },
//   { id: 4, username: 'sarahjones', name: 'Sarah Jones', interests: ['art', 'traveling'] },
//   { id: 5, username: 'michaelwong', name: 'Michael Wong', interests: ['cooking', 'tech'] },
//   { id: 6, username: 'emilywang', name: 'Emily Wang', interests: ['design', 'yoga'] },
//   { id: 7, username: 'davidpark', name: 'David Park', interests: ['sports', 'movies'] },
//   { id: 8, username: 'oliviagreen', name: 'Olivia Green', interests: ['music', 'travel'] }
// ];

const initialFriends = [
  {
    "username": "johndoe92",
    "email": "johndoe92@example.com",
    "profile_picture": "https://example.com/profile_pics/johndoe92.jpg",
    "is_active": true,
    "created_at": "2024-12-03T18:12:09.408Z",
    "last_login_at": "2024-12-03T18:12:09.408Z",
    "visibility": false,
    "followers": [
      "janedoe88",
      "mike_smith22",
      "mike_smith22",
      "mike_smith22",
      "mike_smith22",
      "mike_smith22",
      "mike_smith22",
      "mike_smith22",
      "mike_smith22",
      "mike_smith22",
      "mike_smith22",
    ],
    "following": [
      "alice_jones",
      "bob_brown",
      "bob_brown",
      "bob_brown",
      "bob_brown",
      "bob_brown",
    ]
  },
  {
    "username": "janedoe88",
    "email": "janedoe88@example.com",
    "profile_picture": "https://example.com/profile_pics/janedoe88.jpg",
    "is_active": true,
    "created_at": "2024-11-15T09:30:20.110Z",
    "last_login_at": "2024-12-02T14:45:56.203Z",
    "visibility": true,
    "followers": [
      "johndoe92",
      "alice_jones"
    ],
    "following": [
      "mike_smith22",
      "bob_brown"
    ]
  },
  {
    "username": "mike_smith22",
    "email": "mike.smith22@example.com",
    "profile_picture": "https://example.com/profile_pics/mike_smith22.jpg",
    "is_active": true,
    "created_at": "2024-09-10T14:03:35.205Z",
    "last_login_at": "2024-12-03T09:12:47.102Z",
    "visibility": true,
    "followers": [
      "johndoe92",
      "bob_brown"
    ],
    "following": [
      "janedoe88",
      "alice_jones"
    ]
  },
  {
    "username": "alice_jones",
    "email": "alice.jones@example.com",
    "profile_picture": "https://example.com/profile_pics/alice_jones.jpg",
    "is_active": false,
    "created_at": "2024-08-25T11:20:18.305Z",
    "last_login_at": "2024-09-05T17:00:25.305Z",
    "visibility": false,
    "followers": [
      "johndoe92"
    ],
    "following": [
      "janedoe88"
    ]
  }
]
// const AddFriendButton = () => {
//   const [isRequested, setIsRequested] = useState(false);

//   const handleAddFriendClick = () => {
//     setIsRequested(true); // Change button state to 'Requested'
//   };
// }

const FriendSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [initialFriends, setInitialFriends] = useState([]); //TODO: Uncomment this

  let filteredFriends = useMemo(() => {
    if (!searchTerm) return initialFriends;
        const searchRegex = new RegExp(searchTerm, 'i');
    
    return initialFriends.filter(friend => 
      searchRegex.test(friend.username)
    );
  }, [searchTerm, initialFriends]);

  const getFriendsData = async () => {
    await axios.post('http://localhost:8000/getFriendsList', {
      username: searchTerm
    }).then((response) => {
      // setInitialFriends(response.friend_list) //TODO: Uncomment this
    })
    .catch((error) => console.error('Error fetching user data:', error));
  }

  useEffect(() => {
    // getFriendsData() //TODO: Uncomment this
  }, [])

  const [isRequested, setIsRequested] = useState(false);
  const handleAddFriendClick = () => {
    setIsRequested(true); 
  };

  return (
    <div 
      // className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8"
      style={{ 
        backgroundColor: '#F0F4F8',
        color: '#2D3748'
      }}
    >
      <div 
        // className="w-full max-w-7xl bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10"
        style={{ 
          backgroundColor: 'white',
          borderLeft: '4px solid #3182CE'
        }}
      >
        <h1 
          // className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center"
          style={{ color: '#2C5282' }}
        >
          Find New Friends
        </h1>
        
        <div 
          // className="relative mb-6 max-w-2xl mx-auto"
        >
          <input 
            type="text" 
            placeholder="Search by username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // className="w-full pl-10 pr-4 py-2 md:py-3 lg:py-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 text-sm md:text-base"
            style={{ 
              backgroundColor: 'white', 
              borderColor: '#CBD5E0',
              color: '#2D3748',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Search 
            // className="absolute left-3 top-1/2 transform -translate-y-1/2" 
            color="#3182CE"
            size={20}
          />
        </div>

        <div 
        // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2"
        >
          {filteredFriends.map(friend => (
            <div className="user-item">
              <h2 className="username">{friend.username}</h2>
              <p className="email">{friend.email}</p>
              <p className="followers-count">Followers: {friend.followers.length}</p>
              <div className='followers-class'>
                {
                  friend.followers.slice(0, 3).map((item, index) => (
                    <p className="followers-inner" key={index}>
                      {item}{index !== friend.followers.slice(0, 3).length - 1 ? ',' : ''}
                    </p>
                  ))
                }
                {
                  friend.followers.length > 3 && (
                    <p className="followers-inner">...</p>
                  )
                }
              </div>
              <p className="following-count">Following: {friend.following.length}</p>
              <div className='followers-class'>
                {
                  friend.following.slice(0, 3).map((item, index) => (
                    <p className="followers-inner" key={index}>
                      {item}{index !== friend.following.slice(0, 3).length - 1 ? ',' : ''}
                    </p>
                  ))
                }
                {
                  friend.following.length > 3 && (
                    <p className="followers-inner">...</p>
                  )
                }
              </div>

              <button 
                className={`add-friend-button ${isRequested ? 'requested' : ''}`}
                onClick={handleAddFriendClick}
                disabled={isRequested}
              >
                <i className={`fas ${isRequested ? 'fa-check' : 'fa-user-plus'}`}></i> 
                {isRequested ? 'Requested' : 'Add Friend'}
              </button>
            </div>
          ))}
        </div>

        {filteredFriends.length === 0 && (
          <p 
            // className="text-center mt-4 text-gray-500 text-sm md:text-base"
          >
            No friends found matching your search
          </p>
        )}
      </div>
    </div>
  );
};

export default FriendSearch;