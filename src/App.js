import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import VPB from "./components/VPB";
import TM from "./components/TM";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" />
          <Route exact path="/VPB" component={VPB} />
          <Route exact path="/TM" component={TM} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
