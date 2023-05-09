import React, { FC } from "react";
import { Table } from "react-bootstrap";

interface MyTableProps {
  data: Array<string[]>;
}

const MyTable: FC<MyTableProps> = ({ data }) => {
  return (
    <Table responsive bordered className="mb-3">
      <thead>
        <tr>
          {data[0].map((title, index) => (
            <th key={`${title}${index}`}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          if (index === 0) return;
          return (
            <tr key={`${index}${item.join("")}`}>
              {item.map((text, i) => (
                <td key={`${i}${text}`}>{text}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default MyTable;
