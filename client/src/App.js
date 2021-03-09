import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";

import UserContextProvider from "./context/UserContext";
import LoginPage from "./components/pages/Login";
import SignUpPage from "./components/pages/Register";
import TripsPage from "./components/pages/Trips";
import TripPage from "./components/pages/Trip";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <Router>
          <UserContextProvider>
            <Header />
            <Switch>
              <Route exact path="/">
                <TripsPage />
              </Route>
              <Route exact path="/trips/:id">
                <TripPage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <SignUpPage />
              </Route>
            </Switch>
          </UserContextProvider>
        </Router>
      </div>
    </StylesProvider>
  );
}

export default App;
