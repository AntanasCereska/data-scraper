import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import VPB from "./components/VPB";
import Header from "./components/Header";

const App = (props) => {

  const customProps = [
    { link: "/VPB", title: "VPB" },
    { link: "/TM", title: "TM" },
  ];

  return (
    <Router>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route exact path={customProps[0].link}> <VPB customProps={customProps[0]} /> </Route>
          <Route exact path={customProps[1].link}> <VPB customProps={customProps[1]} /> </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
