import {
  AlignmentType,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";

import { GenerateData } from "./generateData";

const SIZE = 28;
const FONT = "Calibri";
const COLOR = "000000";

const generateTable = (rows: Array<string[]>): Table => {
  return new Table({
    width: {
      size: 10000,
      type: WidthType.DXA,
    },
    rows: rows.map((row, index) => {
      if (index === 0)
        return new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: cell,
                        bold: true,
                        font: FONT,
                        color: COLOR,
                        size: 24,
                      }),
                    ],
                  }),
                ],
              })
          ),
        });

      return new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: cell,
                      font: FONT,
                      color: COLOR,
                      size: 24,
                    }),
                  ],
                }),
              ],
            })
        ),
      });
    }),
  });
};

export const generateDocx = async (data: GenerateData) => {
  const buffer = await fetch(data.data[2].fetchSheetsData as string).then((response) => {
    return response.arrayBuffer();
  });

  const table_1 = generateTable(data.data[3].fetchSheetsData as string[][]);
  const table_2 = generateTable(data.data[4].fetchSheetsData as string[][]);

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `Документ № ${data.data[0].fetchSheetsData[0][0]}`,
                font: FONT,
                color: COLOR,
                size: SIZE,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 1000,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Выбранный сценарий: ${data.data[1].fetchSheetsData[0][0]}`,
                font: FONT,
                color: COLOR,
                size: SIZE,
              }),
            ],
            spacing: {
              after: 700,
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Теперь вставляется картинка:",
                font: FONT,
                color: COLOR,
                size: SIZE,
              }),
            ],
            spacing: {
              after: 700,
            },
          }),

          new Paragraph({
            children: [
              new ImageRun({
                data: buffer,
                transformation: {
                  width: 200,
                  height: 200,
                },
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Формируем Таблицу 1:",
                font: FONT,
                color: COLOR,
                size: SIZE,
              }),
            ],
            spacing: {
              before: 700,
              after: 700,
            },
          }),
          table_1,
          new Paragraph({
            children: [
              new TextRun({
                text: "Формируем Таблицу 2:",
                font: FONT,
                color: COLOR,
                size: SIZE,
              }),
            ],
            spacing: {
              before: 700,
              after: 700,
            },
          }),
          table_2,
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "document.docx");
  });
};
