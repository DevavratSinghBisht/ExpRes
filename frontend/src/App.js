import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import ContactList from './ContactList';
import ChatPage from './ChatPage';
import Login from './login';
import ProfilePage from './ProfilePage.js';
import FriendSearch from './FriendSearch.js';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const cardStyle = {
    flex: 1,
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    maxWidth: '400px',
    textAlign: 'center',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      alignItems: 'center', 
      backgroundColor: '#e5f3f3',
      padding: '20px'
    }}>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '900px'
            }}>
              <div style={cardStyle}>
                <h1 style={{ marginBottom: '20px', color: '#333' }}>Login</h1>
                <Login />
              </div>

              <div style={cardStyle}>
                <h1 style={{ marginBottom: '20px', color: '#333' }}>Register</h1>
                <RegistrationForm />
              </div>
            </div>
          }
        />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/chat/:contactId" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friendsearch" element={<FriendSearch />} />
      </Routes>
    </div>
  );
}

export default App;