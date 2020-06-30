import React from "react";
import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Authentication from "./Authentication";
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();
function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route
          path="/"
          render={() =>
            !JSON.parse(localStorage.getItem("user")) ? (
              <Authentication />
            ) : (
              <Dashboard/>
            )
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
