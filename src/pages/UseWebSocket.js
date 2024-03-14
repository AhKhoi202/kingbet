import { useState, useEffect } from "react";

const UseWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed.");
      // Optionally, you can try to reconnect here if needed.
    };

    setSocket(newSocket);
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  return socket;
};

export default UseWebSocket;
