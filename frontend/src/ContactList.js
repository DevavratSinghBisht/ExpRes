import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactList = () => {
  const navigate = useNavigate();
  const contacts = [
    { id: 1, name: 'John Doe', status: 'Hey there!' },
    { id: 2, name: 'Jane Smith', status: 'Available' },
    { id: 3, name: 'Mark Taylor', status: 'Busy' },
  ];

  const handleContactClick = (contact) => {
    navigate(`/chat/${contact.id}`, { state: { contactName: contact.name } });
  };

  return (
    <div style={{
      width: '400px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    }}>
      <h2 style={{
        textAlign: 'center',
        padding: '20px',
        background: 'linear-gradient(to right, #C71585, #9370DB)', // Deep Pink to Medium Purple
        color: '#fff',
        margin: 0,
        fontWeight: '500',
        letterSpacing: '0.5px'
      }}>Contacts</h2>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          style={{
            padding: '15px 20px',
            borderBottom: '1px solid #f0e6ff',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff'
          }}
          onClick={() => handleContactClick(contact)}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF0F5'} // Lavender Pink on hover
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(to right, #C71585, #9370DB)', // Matching header gradient
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '15px',
            fontSize: '18px',
            fontWeight: '500',
            boxShadow: '0 2px 8px rgba(199, 21, 133, 0.2)' // Soft shadow with pink tint
          }}>
            {contact.name.charAt(0)}
          </div>
          <div>
            <h4 style={{ 
              margin: '0', 
              fontSize: '16px',
              color: '#C71585', // Deep Pink for name
              fontWeight: '500'
            }}>{contact.name}</h4>
            <p style={{ 
              margin: '0', 
              fontSize: '12px', 
              color: '#9370DB', // Medium Purple for status
              marginTop: '4px'
            }}>{contact.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;