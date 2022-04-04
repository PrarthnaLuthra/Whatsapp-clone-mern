import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./SidebarChat.css";
import { useEffect, useState } from "react";

import Authdb from "./firebase";
import { Link } from "react-router-dom";
import { Message } from "@material-ui/icons";
function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter the name for the chat room");
    if (roomName) {
      Authdb.collection("rooms").add({
        name: roomName,
      });
    }
    // } else {
    // }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat_info">
          <h2> {name}</h2>
          {console.log(name)}
          <p>Last message....</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <i>
        <b>Add New Chat</b>
      </i>
    </div>
  );
}

export default SidebarChat;
