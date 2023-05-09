import { getGoogleDocs } from "@root/api/getGoogleDocs";
import { getGoogleSheets } from "@root/api/getGoogleSheets";
import { getImage } from "@root/api/getImage";
import { GetGoogleSheetsData } from "@root/interfaces";

export interface GenerateData {
  docsError: string;
  errorGoogleSheets: string | undefined;
  data: GetGoogleSheetsData[];
}

export const generateData = async (
  googleSheetsLink: string,
  googleDocsLink: string,
  accessToken: string
): Promise<GenerateData> => {
  const googleSheetsId = googleSheetsLink.split("/")[5];
  const googleDocsId = googleDocsLink.split("/")[5];

  //получение параметров из шаблона

  const docsParametrs: string[] = [];

  const docs = await getGoogleDocs(googleDocsId, accessToken);

  const docsError = docs.errorMessage;

  //форматирование параметров

  docs.arrayTextFromDocs.forEach((item) => {
    if (!item) return;
    item.forEach((str) => {
      if (str[0] === "{") {
        const newStr = str.slice(1, -1).split("-");
        if (newStr.length < 5) {
          if (newStr[0].split(" ").length > 1) docsParametrs.push(`'${newStr[0]}'!R${newStr[2]}C${newStr[1]}`);
          else docsParametrs.push(`${newStr[0]}!R${newStr[2]}C${newStr[1]}`);
        } else {
          if (newStr[0].split(" ").length > 1)
            docsParametrs.push(`'${newStr[0]}'!R${newStr[2]}C${newStr[1]}:R${newStr[4]}C${newStr[3]}`);
          else docsParametrs.push(`${newStr[0]}!R${newStr[2]}C${newStr[1]}:R${newStr[4]}C${newStr[3]}`);
        }
      }
    });
  });

  //получение данных из таблицы

  const googleSheetsData = await Promise.all(
    docsParametrs.map(async (range, index) => {
      if (index === 2) return await getImage(googleSheetsId, range);
      return await getGoogleSheets(googleSheetsId, range);
    })
  );

  const errorGoogleSheets = googleSheetsData.find((item) => item.errorMessage.length > 0)?.errorMessage;

  return {
    docsError,
    errorGoogleSheets,
    data: googleSheetsData,
  };
};
