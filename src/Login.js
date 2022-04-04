import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./login.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png" />
        <div className="login_text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
