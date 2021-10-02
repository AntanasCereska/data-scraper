import React, { useEffect, useState } from "react";
import rp from "request-promise";
import cheerio from "cheerio";
import "./App.css";

import VPB from './components/VPB'
import Table from "./components/Table";
import SearchForm from "./components/SearchForm";


const App = () => {


  return (
    <div className="wrapper">
      <VPB />
    </div>
  );
};
export default App;
