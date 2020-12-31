
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Dashboard from "./components/Dashboard";

function App() {
  return <Router key="routerswitch">
      <Route
          exact
          path="/"
          render={() => {
              return <Redirect to="/home" />;
          }}
      />
      <Route exact path="/home" component={Dashboard} />
  </Router>
}

export default App;
