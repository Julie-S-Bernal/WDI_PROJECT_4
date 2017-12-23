import React from "react";
import { withRouter } from "react-router-dom";
import { AppBar, Button } from "material-ui";

import Auth from "../../lib/Auth";

const Navbar = ({ history }) => {
  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push("/");
  }

  function register() {
    history.push("/register");
  }

  function login() {
    history.push("/login");
  }

  return (
    <AppBar position="static" title="Travel app">
      {!Auth.isAuthenticated() && <Button onClick={login}>Login</Button>}{" "}
      {!Auth.isAuthenticated() && (
        <Button onClick={register} className="standard-button">
          Register
        </Button>
      )}{" "}
      {Auth.isAuthenticated() && (
        <Button href="#" className="standard-button" onClick={logout}>
          Logout
        </Button>
      )}{" "}
    </AppBar>
  );
};

export default withRouter(Navbar);
