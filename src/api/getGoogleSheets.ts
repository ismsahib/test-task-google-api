import axios from "axios";

const API_KEY = "AIzaSyD83j76torb4XCBi1wZYyppN6OA3JKgqGc";

export interface GetGoogleSheetsData {
  arrayValuesFromSheets: Array<string[]>;
  errorMessage: string;
}

export const getGoogleSheets = async (id: string, range: string): Promise<GetGoogleSheetsData> => {
  try {
    const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${API_KEY}`;
    const response = await axios.get(BASE_URL);
    return {
      arrayValuesFromSheets: response.data.values.filter((value) => value.length !== 0),
      errorMessage: "",
    };
  } catch (error) {
    return {
      arrayValuesFromSheets: [],
      errorMessage: "Не удалось получить данные с таблицы!",
    };
  }
};
