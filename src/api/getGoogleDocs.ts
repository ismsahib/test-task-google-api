import axios from "axios";

import { getArrayTextFromDocs } from "@root/utils/getArrayTextFromDocs";

export interface GetGoogleDocsData {
  arrayTextFromDocs: Array<string[] | undefined>;
  errorMessage: string;
}

export const getGoogleDocs = async (id: string, accessToken: string): Promise<GetGoogleDocsData> => {
  try {
    const BASE_URL = `https://docs.googleapis.com/v1/documents/${id}`;
    const response = await axios.get(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { arrayTextFromDocs: getArrayTextFromDocs(response.data.body.content), errorMessage: "" };
  } catch (error) {
    return { arrayTextFromDocs: [undefined], errorMessage: "Не удалось получить данные из шаблона!" };
  }
};
