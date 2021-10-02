import React, { useState, useEffect } from "react";
import ReactToExcel from "react-html-table-to-excel";
import rp from "request-promise";
import cheerio from "cheerio";
const URL = "https://search.vpb.lt/pdb/patent/eu/dossier/";
const SearchForm = ({ setInputPatents, inputPatents, setData, data }) => {
  function GetInputValues(event) {
    let inputValuesTemp = document.getElementById("numbers-input").value;
    let inputValuesTempSplit = inputValuesTemp.split("\n");
    setInputPatents((prevInputPatents) => [...inputValuesTempSplit]);
  }

  useEffect(() => {
    let names = [];

    for (let a = 0; a < inputPatents.length; a++) {
      console.log(URL + inputPatents[a]);
      //console.log(`https://cors-anywhere.herokuapp.com/https://search.vpb.lt/pdb/patent/eu/dossier/` + aaa[i])

      rp(URL + inputPatents[a])
        .then((html) => {
          let $ = cheerio.load(html);
          let one = Object.create(null);

          one.id = inputPatents[a];
          one.isPatentValid = $(".datablock_status div p span").text();
          if (one.isPatentValid === "Patentas galioja") {
            one.nextYearPay = $(
              'table:contains("Kitas metų mokestis") .value'
            ).text();
          } else {
            one.nextYearPay = "";
          }
          console.log("✌.|•͡˘‿•͡˘|.✌   ✌.|•͡˘‿•͡˘|.✌   ✌.|•͡˘‿•͡˘|.✌");
          names.push(one);
          setData((prevData) => [...names]);
        })
        .catch(function (err) {
          let one = Object.create(null);
          one.id = inputPatents[a];
          one.isPatentValid = "not found";
          one.nextYearPay = "not found";
          names.push(one);
          console.log("error");
          setData((prevData) => [...names]);
        });
    }
  }, [inputPatents]);

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
