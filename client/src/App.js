import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import UserContextProvider from "./context/UserContext";
import SignInSide from "./components/pages/Login/login";
import SignUp from "./components/pages/Register/register.js";
import Planner from "./components/pages/Planner/planner.js";
import Header from "./components/Header/header.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <Header />
          <Switch>
            <Route exact path="/">
              <Planner />
            </Route>
            <Route exact path="/login">
              <SignInSide />
            </Route>
            <Route exact path="/register">
              <SignUp />
            </Route>
          </Switch>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
