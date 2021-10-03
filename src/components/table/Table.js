import React from "react";
import "../../App.css";
import TableRow from "./TableRow";

const URL = "https://search.vpb.lt/pdb/patent/eu/dossier/";


const Table = ({ data }) => {
  return (
    <div>
      {data.length > 0 ?
        <table id="data-to-excel">
          <tbody>
            <tr>
              <th>Number</th>
              <th>Is Valid</th>
              <th>Next year pay</th>
              <th>Link</th>
            </tr>
            {data.map(({ id, isPatentValid, nextYearPay }) => {
              return (
                <>
                  {(function () {
                    switch (isPatentValid) {
                      case "Patentas neįsigaliojo (pagal EPK)":
                        return (
                          <TableRow
                            className={"isNotValid"}
                            key={id}
                            id={id}
                            isPatentValid={isPatentValid}
                            nextYearPay={nextYearPay}
                            URL={URL}

                          />
                        );
                      case "not found":
                        return (
                          <TableRow
                            className={"isNotFound"}
                            id={id}
                            isPatentValid={isPatentValid}
                            nextYearPay={nextYearPay}
                            URL={URL}
                          />
                        );
                      case "Patentas galioja":
                        return (
                          <TableRow
                            className={"isValid"}
                            id={id}
                            isPatentValid={isPatentValid}
                            nextYearPay={nextYearPay}
                            URL={URL}
                          />
                        );
                      default:
                        return null;
                    }
                  })()}
                </>
              );
            })}
          </tbody>
        </table> : ''}

    </div>
  );
};

export default Table;
