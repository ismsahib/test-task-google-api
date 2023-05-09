import axios from "axios";

import { GetGoogleSheetsData } from "@root/interfaces";

const API_KEY = "AIzaSyD83j76torb4XCBi1wZYyppN6OA3JKgqGc";

//получение ссылки на картинку

export const getImage = async (id: string, range: string): Promise<GetGoogleSheetsData> => {
  try {
    //получаем формулу из ячейки Результат

    const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?valueRenderOption=FORMULA&key=${API_KEY}`;
    const response = await axios.get(BASE_URL);

    //по формуле получаем ссылку из исходного листа

    const newRange = response.data.values[0][0].split("'").slice(1).join("");
    const responseUrl = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${newRange}?valueRenderOption=FORMULA&key=${API_KEY}`
    );
    return {
      fetchSheetsData: responseUrl.data.values[0][0].split('"')[1],
      errorMessage: "",
    };
  } catch (error) {
    return {
      fetchSheetsData: "",
      errorMessage: "Не удалось получить изображение!",
    };
  }
};
