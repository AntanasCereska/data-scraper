import React, { useEffect, useState } from "react";
import rp from "request-promise";
import cheerio from "cheerio";
import ReactToExcel from "react-html-table-to-excel";
import "./App.css";

const App = () => {
  var URL = "https://search.vpb.lt/pdb/patent/eu/dossier/";
  const [inputPatents, setInputPatents] = useState([]);
  const [data, setData] = useState([]);

  function GetInputValues() {
    let inputValuesTemp = document.getElementById("tex").value;
    console.log(inputValuesTemp);
    let inputValuesTempSplit = inputValuesTemp.split("\n");
    console.log(inputValuesTempSplit);
    setInputPatents([...inputValuesTempSplit]);
  }

  /*   let inputPatents = [
    2005819, 2005859, 2341905, 2854722, 2890780, 3221357, 2612152, 3423296,
    3516375, 3044231, 3145488, 3389727, 3515990, 2229360, 2758172, 3303737,
    3303230, 3337502, 3405582, 3129567, 3129567, 3206694, 3206694, 3206694,
    3344731, 3344731,
  ]; */

  useEffect(() => {
    let names = [];

    for (let a = 0; a < inputPatents.length; a++) {
      console.log(inputPatents[a]);
      //console.log(`https://cors-anywhere.herokuapp.com/https://search.vpb.lt/pdb/patent/eu/dossier/` + aaa[i])

      rp(URL + inputPatents[a])
        .then((html) => {
          let $ = cheerio.load(html);

          console.log(inputPatents[a]);

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

          console.log(one);
          console.log("✌.|•͡˘‿•͡˘|.✌   ✌.|•͡˘‿•͡˘|.✌   ✌.|•͡˘‿•͡˘|.✌");

          names.push(one);

          setData(names);

          console.log(names);
          console.log(data.length);
          console.log(inputPatents.length);
        })
        .catch(function (err) {
          let one = Object.create(null);
          one.id = inputPatents[a];
          one.isPatentValid = "not found";
          one.nextYearPay = "not found";
          names.push(one);
          setData([...names]);
          console.log("error");
        });
    }
  }, [inputPatents]);

  return (
    <div className="wrapper">
      <h1>VPB patent scraper</h1>
      <div className="form">
        <textarea
          name=""
          id="tex"
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
      <table id="data-to-excel">
        <tbody>
          <tr>
            <th>Number</th>
            <th>Is Valid</th>
            <th>Next year pay</th>
            <th>Link</th>
          </tr>
          {data.map(({ id, isPatentValid, nextYearPay }, index) => {
            return (
              <>
                {(function () {
                  switch (isPatentValid) {
                    case "Patentas neįsigaliojo (pagal EPK)":
                      return (
                        <tr key={index} className={"isNotValid"}>
                          <td>{id}</td>
                          <td>{isPatentValid}</td>
                          <td>{nextYearPay}</td>
                          <td>
                            <a href={`${URL}/${id}`} target="_blank">
                              open
                            </a>
                          </td>
                        </tr>
                      );
                    case "not found":
                      return (
                        <tr key={index} className={"isNotFound"}>
                          <td>{id}</td>
                          <td>{isPatentValid}</td>
                          <td>{nextYearPay}</td>
                          <td></td>
                        </tr>
                      );
                    case "Patentas galioja":
                      return (
                        <tr key={index} className={"isValid"}>
                          <td>{id}</td>
                          <td>{isPatentValid}</td>
                          <td>{nextYearPay}</td>
                          <td>
                            <a href={`${URL}/${id}`} target="_blank">
                              open
                            </a>
                          </td>
                        </tr>
                      );
                    default:
                      return null;
                  }
                })()}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default App;
