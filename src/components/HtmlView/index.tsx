import React, { FC } from "react";
import { Container } from "react-bootstrap";

import MyTable from "../MyTable";
import { GenerateData } from "@root/utils/generateData";

interface HtmlViewProps {
  data: GenerateData;
}

const HtmlView: FC<HtmlViewProps> = ({ data }) => {
  return (
    <Container className="border border-1 p-3">
      <div className="text-center mb-3">{`Документ № ${data.data[0].fetchSheetsData[0][0]}`}</div>
      <div className="mb-3">{`Выбранный сценарий: ${data.data[1].fetchSheetsData[0][0]}`}</div>
      <div className="mb-3">Теперь вставляется картинка:</div>
      {typeof data.data[2].fetchSheetsData === "string" && (
        <div className="mb-3">
          <img src={data.data[2].fetchSheetsData} className="img-fluid col-md-4" alt="изображение" />
        </div>
      )}
      <div className="mb-3">Формируем Таблицу 1:</div>
      {typeof data.data[3].fetchSheetsData !== "string" && <MyTable data={data.data[3].fetchSheetsData} />}
      <div className="mb-3">Формируем Таблицу 2:</div>
      {typeof data.data[4].fetchSheetsData !== "string" && <MyTable data={data.data[4].fetchSheetsData} />}
    </Container>
  );
};

export default HtmlView;
