import axios from "axios";

import { GetGoogleSheetsData } from "@root/interfaces";

const API_KEY = "AIzaSyD83j76torb4XCBi1wZYyppN6OA3JKgqGc";

export const getGoogleSheets = async (id: string, range: string): Promise<GetGoogleSheetsData> => {
  try {
    const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${API_KEY}`;
    const response = await axios.get(BASE_URL);
    return {
      fetchSheetsData: response.data.values.filter((value) => value.length !== 0),
      errorMessage: "",
    };
  } catch (error) {
    return {
      fetchSheetsData: "",
      errorMessage: "Не удалось получить данные с таблицы!",
    };
  }
};
