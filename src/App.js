import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
// import { useEffect } from 'react/cjs/react.production.min';
import Pusher from "pusher-js";
import { useEffect } from "react";
import axios from "./axios";
import { useState } from "react";
// import { Router } from "@material-ui/icons";
// import { Switch } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
// import { SignalCellularNullRounded } from "@material-ui/icons";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("9eff8f4747bd8cb57496", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  // const[user,setUser] = useState(null)
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="appBody">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat messages={messages} />
              </Route>
              <Route path="/">
                <Chat messages={messages} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
