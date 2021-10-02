import React, { useState, useEffect } from "react";
import "../App.css";
import ReactToExcel from "react-html-table-to-excel";
const URL = "https://search.vpb.lt/pdb/patent/eu/dossier/";


const Table = ({ data }) => {

  return (
    <div>


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
                        <tr key={id} className={"isNotValid"}>
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

export default Table;
