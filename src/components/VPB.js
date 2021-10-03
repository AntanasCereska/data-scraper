import React, { useState } from "react";
import "../App.css";
import Table from "./table/Table";
import SearchForm from "./SearchForm";


const VPB = ({ customProps }) => {

    const [data, setData] = useState([]);
    const [inputPatents, setInputPatents] = useState([]);
    return (
        <div className="wrapper">
            <SearchForm
                customProps={customProps}
                setInputPatents={setInputPatents}
                inputPatents={inputPatents}
                setData={setData}
                data={data} />
            <Table data={data} />
        </div>
    );
};
export default VPB;
