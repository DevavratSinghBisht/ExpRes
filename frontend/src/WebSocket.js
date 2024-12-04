import { useState, useEffect } from 'react';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000'); 
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };
    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (messageData) => {
    if (ws) {
      ws.send(JSON.stringify(messageData));
    }
  };

  return { sendMessage, ws };
};

export default useWebSocket;
