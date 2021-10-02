import React, { useEffect, useState } from "react";
import rp from "request-promise";
import cheerio from "cheerio";
import "../App.css";
import ReactToExcel from "react-html-table-to-excel";
import Table from "./Table";
import SearchForm from "./SearchForm";


const App = () => {
    const [data, setData] = useState([]);
    const [inputPatents, setInputPatents] = useState([]);

    console.log("inputPatents")

    return (
        <div className="wrapper">
            <SearchForm setInputPatents={setInputPatents} inputPatents={inputPatents} setData={setData} />
            <Table data={data} />
        </div>
    );
};
export default App;
