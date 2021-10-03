import React from "react";

const TableRow = ({ id, isPatentValid, nextYearPay, className, URL }) => {
  return (
    <tr className={className}>
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
};

export default TableRow;
