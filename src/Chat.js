import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./Chat.css";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
  Mic,
} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import axios from "./axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Authdb from "./firebase";

function Chat({ messages }) {
  const [input, setInput] = React.useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "DEMO APP",
      timestamp: "Just Now",
      received: true,
    });
    setInput("");
  };
  // const [input,setInput]= useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  // const [msgs, setMsgs] = useState("");
  useEffect(() => {
    if (roomId) {
      Authdb.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      // Authdb.collection("rooms")
      //   .doc(roomId)
      //   .collection("msgs")
      //   .orderBy("timestamp", "asc")
      //   .onSnapshot((snapshot) =>
      //     setMsgs(snapshot.docs.map((doc) => doc.data()))
      //   );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at ....</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.received && "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a messsage"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
