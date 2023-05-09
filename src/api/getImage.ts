import axios from "axios";

const API_KEY = "AIzaSyD83j76torb4XCBi1wZYyppN6OA3JKgqGc";

export interface GetImageData {
  imageUrl: string;
  errorMessage: string;
}

export const getImage = async (id: string, range: string): Promise<GetImageData> => {
  try {
    const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?valueRenderOption=FORMULA&key=${API_KEY}`;
    const response = await axios.get(BASE_URL);
    const newRange = response.data.values[0][0].split("'").slice(1).join("");
    const responseUrl = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${newRange}?valueRenderOption=FORMULA&key=${API_KEY}`
    );
    return {
      imageUrl: responseUrl.data.values[0][0].split('"')[1],
      errorMessage: "",
    };
  } catch (error) {
    return {
      imageUrl: "",
      errorMessage: "Не удалось получить изображение",
    };
  }
};
