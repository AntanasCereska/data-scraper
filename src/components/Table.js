import React from "react";
import "../App.css";


const Table = ({ data }) => {
  return (
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
  );
};

export default Table;
