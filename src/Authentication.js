import React from "react";
import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import { createBrowserHistory } from "history";
import {
  Login,
  Register,
  Reset,
  ResetLink,
} from "./views/authentication/index";
const hist = createBrowserHistory();
function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route
          path="/login"
          render={() =>
            !JSON.parse(localStorage.getItem("user")) ? (
              <Login />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/register"
          render={() =>
            !JSON.parse(localStorage.getItem("user")) ? (
              <Register />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/resetpassword"
          render={() =>
            !JSON.parse(localStorage.getItem("user")) ? (
              <Reset />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route path="/password/reset/:token" component={ResetLink} />
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
        <Redirect from="/" to={"/login"} />
      </Switch>
    </Router>
  );
}

export default App;
