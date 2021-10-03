import React, { useState } from "react";
import "../App.css";
import Table from "./Table";
import SearchForm from "./SearchForm";


const App = () => {
    const [data, setData] = useState([]);
    const [inputPatents, setInputPatents] = useState([]);

    return (
        <div className="wrapper">
            <SearchForm setInputPatents={setInputPatents} inputPatents={inputPatents} setData={setData} data={data} />
            <Table data={data} />
        </div>
    );
};
export default App;
