import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

import config from "../config";

const BOT_TYPING = "bot-typing";
const BOT_MESSAGE = "bot-message";
const USER_MESSAGE = "user-message";

const useSocket = () => {
  const [botMessage, setBotMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(config.BOT_SERVER_ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socketRef.current.on(BOT_MESSAGE, (message) => {
      setBotMessage(message);
      setTyping(false);
    });

    socketRef.current.on(BOT_TYPING, () => {
      setTyping(true);
    });

    socketRef.current.on(USER_MESSAGE, (message) => {
      console.log("User message", message);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(USER_MESSAGE, messageBody);
  };

  return {
    botMessage,
    typing,
    sendMessage,
  };
};

export default useSocket;
