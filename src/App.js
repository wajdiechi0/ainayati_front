import React from "react";
import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import { createBrowserHistory } from "history";
import {
  Login,
  Register,
  Reset,
  ResetLink
} from "./views/authentication/index";

const hist = createBrowserHistory();
function App() {
  console.log(JSON.parse(localStorage.getItem("user")));
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/login" render={() =>
            !JSON.parse(localStorage.getItem("user")) ? (
              <Login />
            ) : (
              <Redirect to="/dashboard" />
            )
          }/>
        <Route path="/register" render={() =>
            !JSON.parse(localStorage.getItem("user")) ? (
              <Register />
            ) : (
              <Redirect to="/dashboard" />
            )
          }/>
        <Route path="/resetpassword" render={() =>
            !JSON.parse(localStorage.getItem("user")) ? (
              <Reset />
            ) : (
              <Redirect to="/dashboard" />
            )
          }/>
        <Route path="/password/reset/:token" render={() =>
            !JSON.parse(localStorage.getItem("user")) ? (
              <ResetLink />
            ) : (
              <Redirect to="/dashboard" />
            )
          }/>
        <Route
          path="/dashboard"
          render={() =>
            JSON.parse(localStorage.getItem("user")) ? (
              <Dashboard />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
