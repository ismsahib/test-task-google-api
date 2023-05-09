import axios from "axios";

import { GetGoogleSheetsData } from "@root/interfaces";

export const getGoogleSheets = async (id: string, range: string, accessToken: string): Promise<GetGoogleSheetsData> => {
  try {
    const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}`;
    const response = await axios.get(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
