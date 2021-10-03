import React, { useEffect } from "react";
import ReactToExcel from "react-html-table-to-excel";
import rp from "request-promise";
import cheerio from "cheerio";

const URL = "https://search.vpb.lt/pdb/patent/eu/dossier/";


const SearchForm = ({ setInputPatents, inputPatents, setData, data, customProps }) => {

  function GetInputValues() {
    let inputValuesTemp = document.getElementById("numbers-input").value;
    let inputValuesTempSplit = inputValuesTemp.split("\n");

    //remove empty or whitespace strings from array
    inputValuesTempSplit = inputValuesTempSplit.filter(item => item.trim());

    //removes spaces from array strings
    /*     inputValuesTempSplit = inputValuesTempSplit.map(function (item) {
          return item.replace(/\s+/g, '');
        }) */

    setInputPatents((prevInputPatents) => [...inputValuesTempSplit]);
  }

  useEffect(() => {

    //if there is at least 1 item in inputPatents
    if (inputPatents.length !== 0) {

      let names = [];
      for (let a = 0; a < inputPatents.length; a++) {
        //console.log(URL + inputPatents[a]);
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
            }
            else if (one.isPatentValid === "Patentas neįsigaliojo (pagal EPK)") {
              one.nextYearPay = "";
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
      //if there are no items in inputPatents 
    } else {
      setData([])
    }
    console.log(data)
  }, [inputPatents]);

  //refresh all data
  const Refresh = () => {
    setData([])
    document.getElementById('numbers-input').value = "";
  }


  return (
    <>
      <h1>{customProps.title}</h1>
      <div className="form">
        <textarea
          id="numbers-input"
          placeholder="COPY PASTE EP NUMBERS LIKE SHOWN BELOW&#10;1234567&#10;2345678&#10;3456789"
        ></textarea>
        <div className="buttons-wrapper-large">
          <div className="buttons-wrapper-small">
            <button
              className="btn" onClick={GetInputValues} >
              Get Data
            </button>
            <button className="btn" onClick={Refresh} >
              Refresh
            </button>
          </div>
          <div className="buttons-wrapper-small">

            <ReactToExcel
              className={`btn ${data.length >= 1 && data[0].id != '' ? "" : "locked"}`}
              table="data-to-excel"
              filename="excelFile"
              sheet="sheet1"
              buttonText="EXPORT AS EXCEL"
            /></div>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
