import { useEffect, useState } from "react";

const useWebSocket = (url = "ws://localhost:8000") => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        console.log("Message received:", event.data);
      };
    }
  }, [ws]);

  useEffect(() => {
    let socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed. Reconnecting...");
      setTimeout(() => {
        setWs(new WebSocket(url));
      }, 3000); // Retry after 3 seconds
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
  };

  return { ws, sendMessage };
};

export default useWebSocket;
