import React, { useContext, useEffect, useState, useRef } from "react";
import useSound from "use-sound";

import config from "../../../config";
import initialBottyMessage from "../../../common/constants/initialBottyMessage";
import useSocket from "../../../hooks/useSocket";

import TypingMessage from "./TypingMessage";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";

import "../styles/_messages.scss";

function Messages() {
  const messageListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);

  const socket = useSocket();

  useEffect(() => {
    if (messageListRef && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [socket.typing, messages]);

  useEffect(() => {
    addMessage(initialBottyMessage, "Bot");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket.botMessage !== "") {
      addMessage(socket.botMessage, "Bot");
      playReceive();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.botMessage]);

  const sendMessage = () => {
    playSend();
    socket.sendMessage(currentMessage);
    addMessage(currentMessage, "me");
    setCurrentMessage("");
  };

  const onChangeMessage = (e) => {
    setCurrentMessage(e.target.value);
  };

  const addMessage = (message, user) => {
    const messageList = [...messages];
    const newMessage = {
      message: message,
      user: user,
    };
    messageList.push(newMessage);
    setMessages(messageList);
  };

  return (
    <div className="messages">
      <Header />
      <div ref={messageListRef} className="messages__list" id="message-list">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            botTyping={socket.typing}
            nextMessage={message}
          />
        ))}
        {socket.typing && <TypingMessage />}
      </div>
      <Footer
        message={currentMessage}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  );
}

export default Messages;
