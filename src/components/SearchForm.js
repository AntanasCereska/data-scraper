import React from "react";
import ReactToExcel from "react-html-table-to-excel";
import styled from "styled-components";

const SearchForm = ({ GetInputValues }) => {
  return (
    <>
      <h1>VPB patent scraper</h1>
      <div className="form">
        <textarea
          name=""
          id="numbers-input"
          placeholder="COPY PASTE EP NUMBERS LIKE SHOWN BELOW&#10;1234567&#10;2345678&#10;3456789"
        ></textarea>
        <div className="buttons-wrapper">
          <button className="btn" onClick={GetInputValues}>
            Get Data
          </button>
          <ReactToExcel
            className="btn"
            table="data-to-excel"
            filename="excelFile"
            sheet="sheet1"
            buttonText="EXPORT AS EXCEL"
          />
        </div>
      </div>
    </>
  );
};

export default SearchForm;
